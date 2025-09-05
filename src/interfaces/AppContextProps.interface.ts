import type { Step1GeneralDataProps } from './Step1GeneralData.interface';
import type { ProductProps } from './Product.interface';

export interface AppContextProps {
    generalData: Step1GeneralDataProps;
    setGeneralData: (data: Step1GeneralDataProps) => void;
    products: ProductProps[];
    setProducts: (products: ProductProps[]) => void;
}
