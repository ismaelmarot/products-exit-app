import { Row, Col } from 'react-bootstrap';
import type { GeneralDataFormProps } from '../../interfaces/GeneralDataForm.interface';
import FormInput from '../FormInput/FormInput';
import { FormStyled, OptionalText } from './GenerlaDataForm.styled';

const GeneralDataForm = ({ data, onChange }: GeneralDataFormProps) => {
    return (
        <FormStyled>
            <Row>
                <Col md={6}>
                <FormInput
                    label="Motivo del egreso*"
                    name='reason'
                    value={data.reason}
                    onChange={onChange}
                    required
                />
                </Col>
                <Col md={6}>
                <FormInput
                    label="Responsable*"
                    name='personInCharge'
                    value={data.personInCharge}
                    onChange={onChange}
                    required
                />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                <FormInput
                    label="Fecha de salida*"
                    name='departureDate'
                    value={data.departureDate || ''}
                    onChange={onChange}
                    type='date'
                    required
                />
                </Col>
                <Col md={6}>
                <FormInput
                    label={<>Fin<OptionalText>(opcional)</OptionalText></>}
                    name='returnDate'
                    value={data.returnDate || ''}
                    onChange={onChange}
                    type='date'
                />
                </Col>
            </Row>
        </FormStyled>
    );
};

export default GeneralDataForm;
