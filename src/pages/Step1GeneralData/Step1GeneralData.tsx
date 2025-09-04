import { useState } from 'react';
import type { GeneralDataProps } from '../../interfaces/GeneralData.interface';
import GeneralDataForm from '../../components/GeneralDataForm/GeneralDataForm';

const Step1GeneralData = () => {
    const [data, setData] = useState<GeneralDataProps>({
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
