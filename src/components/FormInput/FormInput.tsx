import { Form } from 'react-bootstrap';
import type { FormInputProps } from '../../interfaces/FormInput.interface';

const FormInput = ({
    label,
    name,
    value,
    onChange,
    type = 'text',
    required = false,
    placeholder = '',
    }: FormInputProps) => {
    return (
        <Form.Group controlId={name} className='mb-3'>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
        />
        </Form.Group>
    );
};

export default FormInput;
