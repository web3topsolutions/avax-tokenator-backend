// tokens/commands/impl/create-token.command.ts
export class CreateTokenCommand {
    constructor(
      public readonly name: string,
      public readonly symbol: string,
      public readonly decimals: number,
      public readonly supply: number,
      public readonly description: string,
      public readonly image: string,
    ) {}
  }
  