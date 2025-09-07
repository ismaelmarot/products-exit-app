export interface ProductProps {
    description: string;
    quantity?: number;
    code?: string;
    price?: number | string;
    producer?: string;
    category?: string;
    paymentMethod?: string;
}
