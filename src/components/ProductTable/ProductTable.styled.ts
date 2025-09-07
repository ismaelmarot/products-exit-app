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

export const Td = styled.td`
    min-width: 12rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;