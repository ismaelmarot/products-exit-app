import { useState, useContext } from 'react';
import type { Step1GeneralDataProps, Step1GeneralDataComponentProps } from '../../interfaces/Step1GeneralData.interface';
import GeneralDataForm from '../../components/GeneralDataForm/GeneralDataForm';
import { AppContext } from '../../context/AppContext';

const Step1GeneralData: React.FC<Step1GeneralDataComponentProps> = ({ onNext }) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { setGeneralData } = context;

    const [data, setData] = useState<Step1GeneralDataProps>({
        reason: '',
        personInCharge: '',
        departureDate: '',
        returnDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        // Guardamos los datos en el contexto
        setGeneralData(data);
        // Luego seguimos al siguiente paso
        onNext();
    };

    return (
        <>
            <h2>Datos Generales</h2>
            <div style={{ border: '1px solid #99a1af', borderRadius:'5px' }}>
                <GeneralDataForm data={data} onChange={handleChange} />
                <div className='d-flex justify-content-end m-3'>
                    <button className="btn btn-primary" onClick={handleNext}>
                        Siguiente
                    </button>
                </div>
            </div>
        </>
    );
};

export default Step1GeneralData;
