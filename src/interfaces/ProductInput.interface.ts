import type { ChangeEvent } from 'react';

export interface ProductInputProps {
    label: string;
    name: string;
    type?: string;
    value: string | number | undefined;
    onChange: (e: ChangeEvent<any>) => void;
    required?: boolean;
    min?: number;
    step?: number;
    placeholder?: string;
}