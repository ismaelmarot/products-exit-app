import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const FormStyled = styled(Form)`
  padding: 1rem;
  border: 1px solid #99a1af;
  border-radius: 5px;

  .form-group {
    margin-bottom: 0.25rem;
  }

  .form-label {
    margin-top: .4rem;
    margin-bottom: 0.1rem;
  }

  .form-control {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
`;
