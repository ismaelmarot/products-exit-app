import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { Colors } from '../../constants/colors';

export const StyledModalBody = styled(Modal.Body)`
    font-size: 0.7rem;
    text-align: justify;
    line-height: 1.4;
    color: ${Colors.black};
`;

export const LinkStyled = styled.a`
    text-decoration: none;
`;