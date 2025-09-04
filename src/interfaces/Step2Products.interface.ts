import type { Product } from './Product.interface';

export interface Step2ProductsProps {
    initialProducts?: Product[];
    onNext: (products: Product[]) => void;
    onBack: () => void;
}
