import { Form } from 'react-bootstrap';
import { DivStyled, MdClearStyled } from './ClearableInput.styled';
import type { ClearableInputProps } from '../../interfaces/ClearableInput.interface';

const ClearableInput = ({ label, name, value, onChange, onClear, type = 'text', required, min, step }: ClearableInputProps) => (
    <DivStyled>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            required={required}
            min={min}
            step={step}
        />
        {value !== undefined && value !== '' && onClear && (
            <MdClearStyled onClick={onClear} />
        )}
  </DivStyled>
);

export default ClearableInput;
