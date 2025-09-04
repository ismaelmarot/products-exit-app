import type { ProductProps } from './Product.interface';

export interface ProductTableProps {
    products: ProductProps[];
    onUpdate: (index: number, updated: ProductProps) => void;
    onDelete: (index: number) => void;
}
