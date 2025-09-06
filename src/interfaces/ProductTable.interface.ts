import type { ProductProps } from './Product.interface';

export interface ProductTableProps {
    products: ProductProps[];
    onEdit: (index: number) => void;
    onDelete: (index: number) => void;
}
