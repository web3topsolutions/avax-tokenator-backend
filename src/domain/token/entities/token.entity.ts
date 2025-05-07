export class Token {
    ownerAddress: string;
    tokenAddress: string;
    name: string;
    symbol: string;
    initialSupply: number;
    decimals: number;
    burnable: boolean;
    mintable: boolean;
    verified: boolean;

    constructor(
        ownerAddress: string,
        tokenAddress: string,
        name: string,
        symbol: string,
        initialSupply: number,
        decimals: number,
        burnable: boolean = false,
        mintable: boolean = false,
        verified: boolean = false
    ) {
        this.ownerAddress = ownerAddress;
        this.tokenAddress = tokenAddress;
        this.name = name;
        this.symbol = symbol;
        this.initialSupply = initialSupply;
        this.decimals = decimals;
        this.burnable = burnable;
        this.mintable = mintable;
        this.verified = verified;
    }
}