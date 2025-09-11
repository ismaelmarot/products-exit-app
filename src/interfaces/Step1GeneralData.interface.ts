export interface Step1GeneralDataProps {
    generalData: {
        reason: string;
        personInCharge: string;
        departureDate?:  string;
        returnDate?: string;
    },
}

export interface Step1GeneralDataComponentProps {
    onNext: () => void;
}