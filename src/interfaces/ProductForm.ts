import type { ProductProps } from './Product.interface';
export interface ProductFormProps {
    onAdd: (product: ProductProps) => void;
    initialProduct?: ProductProps;
    persistentProducer?: string;
    setPersistentProducer?: (value: string) => void;
    persistentCategory?: string;
    setPersistentCategory?: (value: string) => void;
}
