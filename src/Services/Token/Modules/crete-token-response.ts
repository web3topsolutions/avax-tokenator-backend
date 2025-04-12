import { Expose } from 'class-transformer';

export class CreateTokenResponse {
    @Expose()
    tokenAccount: string;

    @Expose()
    amount: number;

    @Expose()
    destination: string;

    constructor(
        tokenAccount: string,
        amount: number,
        destination: string,
    ) {
        this.tokenAccount = tokenAccount;
        this.amount = amount;
        this.destination = destination;
    }
}