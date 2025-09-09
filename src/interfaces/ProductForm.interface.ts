import type React from 'react';
import type { ProductProps } from './Product.interface';
export interface ProductFormProps {
    onAdd: (product: ProductProps) => void;
    
    initialProduct?: ProductProps;

    persistentProducer?: string;
    setPersistentProducer?: (value: string) => void;

    persistentCategory?: string;
    setPersistentCategory?: (value: string) => void;

    persistentDescription?: string;
    setPersistentDescription?: React.Dispatch<React.SetStateAction<string>>;

    persistentPrice?: number;
    setPersistentPrice?: React.Dispatch<React.SetStateAction<number>>;

    products: ProductProps[];
}
