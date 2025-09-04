import type { ProductProps } from './Product.interface';

export interface ProductFormProps {
    onAdd: (product: ProductProps) => void;
}