import type { ProductProps } from './Product.interface';
export interface Step2ProductsProps {
    initialProducts?: ProductProps[];
    onNext: (products: ProductProps[]) => void;
    onBack: () => void;
}
