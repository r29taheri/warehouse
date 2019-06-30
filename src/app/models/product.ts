export class Product {
    public code: string;
    public quantity: number;
    public floor: number;
    public section: number;
    constructor(code: string, quantity: number, floor: number, section: number) {
        this.code = code;
        this.quantity = quantity;
        this.floor = floor;
        this.section = section;
    }
}
