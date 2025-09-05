import { createContext, useState, type ReactNode } from 'react';
import type { Step1GeneralDataProps } from '../interfaces/Step1GeneralData.interface';
import type { ProductProps } from '../interfaces/Product.interface';
import type { AppContextProps } from '../interfaces/AppContextProps.interface';

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [generalData, setGeneralData] = useState<Step1GeneralDataProps>({
        reason: '',
        personInCharge: '',
        departureDate: '',
        returnDate: '',
    });

    const [products, setProducts] = useState<ProductProps[]>([]);

    return (
        <AppContext.Provider value={{ generalData, setGeneralData, products, setProducts }}>
        {children}
        </AppContext.Provider>
    );
};
