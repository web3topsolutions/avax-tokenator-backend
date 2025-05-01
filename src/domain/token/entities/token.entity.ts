export class Token {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    supply: number;
    description: string;
    image: string;

    constructor(
        address: string,
        name: string,
        symbol: string,
        decimals: number,
        supply: number,
        description: string,
        image: string
    ) {
        this.address = address;
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
        this.supply = supply;
        this.description = description;
        this.image = image;
    }
}