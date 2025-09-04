import { Form } from 'react-bootstrap';
import type { ProductInputProps } from '../../../interfaces/ProductInput.interface';

const ProductInput = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    min,
    step,
    placeholder,
    }: ProductInputProps) => {
    return (
        <Form.Group controlId={name}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            min={min}
            step={step}
            placeholder={placeholder}
        />
        </Form.Group>
    );
};

export default ProductInput;
