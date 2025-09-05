import { useState } from 'react';
import type { Step1GeneralDataProps, Step1GeneralDataComponentProps } from '../../interfaces/Step1GeneralData.interface';
import GeneralDataForm from '../../components/GeneralDataForm/GeneralDataForm';

const Step1GeneralData: React.FC<Step1GeneralDataComponentProps> = ({ onNext }) => {
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
        <>
        <h2>Datos Generales</h2>
        <div style={{border: '1px solid #99a1af', borderRadius:'5px'}}>
            <GeneralDataForm data={data} onChange={handleChange} />
            <div className='d-flex justify-content-end m-3'>
                <button className="btn btn-primary" onClick={onNext}>
                    Siguiente
                </button>
            </div>
        </div>
        </>
    );
};

export default Step1GeneralData;
