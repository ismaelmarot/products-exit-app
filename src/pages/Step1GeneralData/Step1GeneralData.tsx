import { useState, useContext } from 'react';
import type { Step1GeneralDataProps, Step1GeneralDataComponentProps } from '../../interfaces/Step1GeneralData.interface';
import GeneralDataForm from '../../components/GeneralDataForm/GeneralDataForm';
import { AppContext } from '../../context/AppContext';
import { DivStyled } from './Step1GeneralData.styled';

const Step1GeneralData: React.FC<Step1GeneralDataComponentProps> = ({ onNext }) => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { setGeneralData } = context;

    const [data, setData] = useState<Step1GeneralDataProps>({
        generalData: {
            reason: '',
            personInCharge: '',
            departureDate: '',
            returnDate: '',
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            generalData: {
                ...data.generalData,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleNext = () => {
        setGeneralData(data);
        onNext();
    };

    return (
        <>
            <h2>Datos Generales</h2>
            <DivStyled>
                <GeneralDataForm data={data} onChange={handleChange} />
                <div className='d-flex justify-content-end m-3'>
                    <button className="btn btn-primary" onClick={handleNext}>
                        Siguiente
                    </button>
                </div>
            </DivStyled>
        </>
    );
};

export default Step1GeneralData;
