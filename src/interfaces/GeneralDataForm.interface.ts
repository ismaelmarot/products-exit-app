import type { GeneralDataPros } from './GeneralData.interface';
export interface GeneralDataFormProps {
    data: GeneralDataPros;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
