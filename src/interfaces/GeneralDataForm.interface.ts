import type { GeneralDataProps } from './GeneralData.interface';

export interface GeneralDataFormProps {
    data: GeneralDataProps;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
