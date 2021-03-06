import fs from 'fs';

import app, { ask } from '../config/interface';
import Waves from './waves';

const {
  TOKEN_NAME,
  TOKEN_ASSET_ID,
} = process.env;

const tokenName = TOKEN_NAME || 'Tokes';

const Manager = {
  async init() {
    const blockHeight = await ask(`What block height do you want a snapshot of ${TOKEN_NAME}? `);
    console.log(`Getting distribution at height ${blockHeight}...`);

    try {
      const distribution = await Waves.fullDistribution(TOKEN_ASSET_ID, blockHeight);
      fs.writeFile('snapshot.store', JSON.stringify(distribution), (er) => {
        if (er) { return console.error(er); }
        console.log('Snapshot saved!');
        return Manager.distribute(distribution);
      });
      console.log(`Received data on ${Object.keys(distribution).length} ${tokenName} Addresses`);
    } catch (er) {
      console.error(er);
      app.close();
    }
  },

  async distribute(distribution) {
    const seed = await ask('Enter the seed phrase for the distribution account: ');
    const transfers = Waves.massTransferDistribution(distribution, seed);
    console.log('Mass Transfer is ready to broadcast...');

    const launch = await ask('Please type \'launch\' to broadcast the transfers or press Ctrl+C to cancel...');
    if (launch !== 'launch') {
      console.log('Incorrect launch verification entered, broadcast procedure cancelled...');
      return app.close();
    }

    try {
      transfers.forEach(async (transfer) => {
        await Waves.broadcastTx(transfer);
      });

      fs.writeFileSync('distribution.store', JSON.stringify(transfers));
      console.log('Mass Transfer broadcast complete...', transfers);

      return app.close();
    } catch (er) {
      console.error(er);
      return app.close();
    }
  },
};

export default Manager;
