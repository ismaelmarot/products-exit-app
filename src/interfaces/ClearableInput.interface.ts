import type { ChangeEvent } from 'react';

export interface ClearableInputProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: ChangeEvent<any>) => void;
    onClear?: () => void;
    type?: string;
    required?: boolean;
    min?: number;
    step?: number;
}