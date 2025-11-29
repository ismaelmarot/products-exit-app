import styled from 'styled-components';
import { MdClear } from 'react-icons/md';
import { Colors } from '../../constants/colors';

export const DivStyled = styled.div`
    position: relative;
`;

export const MdClearStyled = styled(MdClear)`
    position: absolute;
    right: .3rem;
    top: 2.5rem;
    font-size: 1.2rem;
    color: ${Colors.grey};
    cursor: pointer;
`;
