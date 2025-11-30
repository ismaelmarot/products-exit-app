import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { Colors } from '../../constants/colors';
export const FormStyled = styled(Form)`
    padding: 1rem;

    .form-group, .mb-3 {
        margin-bottom: 0.30rem;
    }

    label.form-label {
        margin-bottom: 0.1rem;
    }

  input.form-control {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
`;

export const OptionalText = styled.span`
    font-size: 0.6rem;
    color: ${Colors.grey};
    margin-left: 0.2rem;
`;
