import type { Step1GeneralDataProps } from './Step1GeneralData.interface';
import type { ProductProps } from './Product.interface';

export interface AppContextProps {
    generalData: Step1GeneralDataProps;
    setGeneralData: (data: Step1GeneralDataProps) => void;
    
    products: ProductProps[];
    setProducts: (products: ProductProps[]) => void;

    order1: string;
    setOrder1: (field: string) =>void;
    order2: string;
    setOrder2: (field: string) => void;
    order3: string;
    setOrder3: (field: string) => void;
    sortType: 'asc' | 'desc';
    setSortType: (order: 'asc' | 'desc') => void;
}
