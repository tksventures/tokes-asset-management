import Waves from '../src/lib/waves';

const mockDistribution = {
  '3M4qwDomRabJKLZxuXhwfqLApQkU592nWxF': 21000000,
  '3M9hgqcvC6akpVkmTR4mu3NNwd3jcvez5FC': 42000000,
  '3MKEeLK85TjysNUCkRWDRsuY3mKkNBgqGCw': 63000000,
};

const mockDistributionResponse = {
  hasNext: false,
  items: mockDistribution,
};

describe('Waves', () => {
  it('should remove blacklisted addresses from distribution', async () => {
    Waves.distributionAtHeight = jest.fn()
      .mockResolvedValueOnce({ ...mockDistributionResponse, hasNext: true })
      .mockResolvedValueOnce(mockDistributionResponse);

    const result = await Waves.fullDistribution(process.env.TOKEN_ASSET_ID, 42);

    expect(Object.keys(result)).toHaveLength(2);
  });

  it('should apply the multiplier to distribution amounts', async () => {
    const massTx = Waves.massTransferDistribution(mockDistribution, 'test seed');

    expect(massTx).toMatchObject({
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
  });
});
