import type { ProductProps } from './Product.interface';
export interface Step2ProductsProps {
    initialProducts?: ProductProps[];
    onNext: () => void;
    onBack: () => void;
}
