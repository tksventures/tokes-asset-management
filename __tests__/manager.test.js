import fs from 'fs';
import Manager from '../src/lib/manager';
import Waves from '../src/lib/waves';
import { ask } from '../src/config/interface';

jest.mock('../src/config/interface');

const mockDistribution = {
  '3M4qwDomRabJKLZxuXhwfqLApQkU592nWxF': 21000000,
  '3M9hgqcvC6akpVkmTR4mu3NNwd3jcvez5FC': 42000000,
  '3MKEeLK85TjysNUCkRWDRsuY3mKkNBgqGCw': 63000000,
};

describe('Manager', () => {
  it('should collect the snapshot block height', async () => {
    ask.mockResolvedValueOnce(42);
    Waves.fullDistribution = jest.fn().mockResolvedValue(mockDistribution);
    fs.writeFile = jest.fn();

    await Manager.init();

    expect(Waves.fullDistribution).toHaveBeenCalledWith(process.env.TOKEN_ASSET_ID, 42);
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
  });

  it('should use seed input for tx signing', async () => {
    ask
      .mockResolvedValueOnce('test seed')
      .mockResolvedValueOnce('launch');
    Waves.broadcastTx = jest.fn().mockResolvedValue(true);
    fs.writeFileSync = jest.fn();

    await Manager.distribute(mockDistribution);

    expect(Waves.broadcastTx.mock.calls[0][0]).toMatchObject({
      type: 11,
      version: 1,
      assetId: 'GqsBTnTXjMh94dWnUJNHys3dGbGhKxgST3Z4Enchj5Cz',
      transfers: [
        {
          recipient: '3M4qwDomRabJKLZxuXhwfqLApQkU592nWxF',
          amount: 525000000,
        },
        {
          recipient: '3M9hgqcvC6akpVkmTR4mu3NNwd3jcvez5FC',
          amount: 1050000000,
        },
        {
          recipient: '3MKEeLK85TjysNUCkRWDRsuY3mKkNBgqGCw',
          amount: 1575000000,
        },
      ],
      fee: 300000,
    });
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
  });
});
