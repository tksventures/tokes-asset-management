import axios from 'axios';
import { massTransfer, broadcast } from '@waves/waves-transactions';

const {
  WAVES_NODE,
  TARGET_ASSET_ID,
  DISTR_BLACKLIST,
  DISTR_MULTIPLIER,
} = process.env;

const Waves = {
  async chainHeight() {
    const { data } = await axios.get(`${WAVES_NODE}/blocks/height`);

    return data ? data.height : false;
  },

  async blockAtHeight(height) {
    const { data } = await axios.get(`${WAVES_NODE}/blocks/at/${height}`);

    return data;
  },

  async distributionAtHeight(asset, height, afterAddress) {
    const pageQuery = afterAddress ? `?after=${afterAddress}` : '';
    const { data } = await axios.get(`${WAVES_NODE}/assets/${asset}/distribution/${height}/limit/999${pageQuery}`);

    return data;
  },

  async fullDistribution(asset, height) {
    let distribution = {};
    let next = true;
    let after = null;

    while (next) {
      /* eslint-disable-next-line */
      const { hasNext, lastItem, items } = await Waves.distributionAtHeight(asset, height, after);
      after = lastItem;
      next = hasNext;
      distribution = { ...distribution, ...items };
    }

    if (DISTR_BLACKLIST) {
      DISTR_BLACKLIST.split(',').forEach(address => {
        delete distribution[address];
      });
    }

    return distribution;
  },

  massTransferDistribution(distribution = {}, seed) {
    const transfers = Object.keys(distribution).map(recipient => ({
      recipient,
      amount: distribution[recipient] * (DISTR_MULTIPLIER || 1),
    }));
    return massTransfer({
      transfers,
      assetId: TARGET_ASSET_ID,
    }, seed);
  },

  broadcastTx(tx) {
    return broadcast(tx, WAVES_NODE);
  },
};

export default Waves;
