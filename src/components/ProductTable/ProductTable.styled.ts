import styled from 'styled-components';
import { Table } from 'react-bootstrap';

export const TableStyled = styled(Table)`
    width: 100%;
    margin-top: 2rem;
    border-collapse: collapse;
`;

export const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
`;

export const Th = styled.td<{ $align?: 'start' | 'center' | 'end'; $minWidth?: string }>`
    text-align: ${({ $align }) => $align || 'start'};
    min-width: ${({ $minWidth }) => $minWidth || 'auto'};
    white-space: nowrap;
`;
