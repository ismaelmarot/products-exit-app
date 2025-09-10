import React from 'react';
import type { GeneraDataPros } from '../../interfaces/GeneralData.interface';
import { formatDate } from '../../helpers/formatDate/formatDate';

const GeneralDataInfo: React.FC<GeneraDataPros> = ({
    generalData: { reason, departureDate, personInCharge, returnDate }
 }) => {
    return (
        <> 
            <h5>Información General</h5>  
            <div className='row'>
                <div className='col-6'>
                <p><strong>Motivo:</strong> { reason }</p>
                </div>
                <div className='col-6 text-end'>
                <p><strong>Salida:</strong> { formatDate(departureDate) }</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                <p><strong>Responsable:</strong> { personInCharge }</p>
                </div>
                <div className='col-6 text-end'>
                <p><strong>Regreso:</strong> { formatDate(returnDate) }</p>
                </div>
            </div>
        </>
    );
}

export default GeneralDataInfo;