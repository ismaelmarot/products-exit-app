import type { ProductProps } from './Product.interface';

export interface EditProductModalProps {
    show: boolean;
    product: ProductProps | null;
    onSave: (updated: ProductProps) => void;
    onCancel: () => void;
}