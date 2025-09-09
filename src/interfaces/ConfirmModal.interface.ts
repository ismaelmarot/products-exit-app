export interface ConfirmModalProps {
    show: boolean;
    title?: string;
    message: string;
    onButton1: () => void;
    onButton2: () => void;
    textButton1?: string;
    textButton2?: string;
}