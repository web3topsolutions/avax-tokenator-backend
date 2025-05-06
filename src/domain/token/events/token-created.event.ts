export type TokenCreatedEvent = {
    eventName: 'TokenCreated';
    args: {
      tokenAddress: `0x${string}`;
      owner: `0x${string}`;
      initialSupply: bigint;
    };
  };