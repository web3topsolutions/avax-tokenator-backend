// tokens/commands/impl/create-token.command.ts
export class CreateTokenCommand {
    constructor(
      public readonly ownerAddress: string,
      public readonly name: string,
      public readonly symbol: string,
      public readonly initialSupply: number,
      public readonly decimals: number,
      public readonly burnable: boolean,
      public readonly mintable: boolean,
      public readonly verified: boolean,
    ) {}
  }
  