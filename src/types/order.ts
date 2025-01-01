export interface Order {
    id: string;
    productName: string;
    number: number;
    items: string[];
    totalPrice: number;
    date: Date;
}