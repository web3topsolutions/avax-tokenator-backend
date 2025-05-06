export class Token {
    ownerAddress: string;
    tokenAddress: string;
    name: string;
    symbol: string;
    supply: number;
    description: string;
    image: string;

    constructor(
        ownerAddress: string,
        tokenAddress: string,
        name: string,
        symbol: string,
        supply: number,
        description: string,
        image: string
    ) {
        this.ownerAddress = ownerAddress;
        this.tokenAddress = tokenAddress;
        this.name = name;
        this.symbol = symbol;
        this.supply = supply;
        this.description = description;
        this.image = image;
    }
}