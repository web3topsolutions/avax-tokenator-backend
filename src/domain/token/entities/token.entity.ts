export class Token {
    name: string;
    symbol: string;
    decimals: number;
    supply: number;
    description: string;
    image: string;

    constructor(
        name: string,
        symbol: string,
        decimals: number,
        supply: number,
        description: string,
        image: string
    ) {
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
        this.supply = supply;
        this.description = description;
        this.image = image;
    }
}