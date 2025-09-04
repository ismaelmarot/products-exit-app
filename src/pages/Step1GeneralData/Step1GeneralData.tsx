import { useState } from 'react';
import type { Step1GeneralDataProps } from '../../interfaces/Step1GeneralData.interface';
import GeneralDataForm from '../../components/GeneralDataForm/GeneralDataForm';

const Step1GeneralData = () => {
    const [data, setData] = useState<Step1GeneralDataProps>({
        reason: '',
        personInCharge: '',
        departureDate: '',
        returnDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div>
        <h2>Datos Generales</h2>
        <GeneralDataForm data={data} onChange={handleChange} />
        </div>
    );
};

export default Step1GeneralData;
