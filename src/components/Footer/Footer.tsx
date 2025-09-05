import React, { useState } from 'react';
import { getCurrentYear } from '../../helpers/getCurrentYear/getCurrentYear';
import LegalModal from '../LegalModel/LegalModal';
import TermsModal from '../../components/TermsModal/TermsModal';
import { FooterStyled, DividingLine } from './Footer.styled';

const Footer: React.FC = () => {
    const [showLegal, setShowLegal] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    return (
        <>
        <FooterStyled className='container border-top'>
            <div className='row align-items-center text-center text-md-start'>
                <div className='col-12 col-md-6 mb-2 mb-md-0'>
                    <p className='mb-0'>
                    © {getCurrentYear()} Designed and developed by Ismael Marot. All rights reserved.
                    </p>
                </div>
                <div className='col-12 col-md-6'>
                    <nav className='d-flex justify-content-center justify-content-md-end align-items-center'>
                        <button 
                            className='btn btn-link px-2 text-decoration-none' 
                            onClick={() => setShowLegal(true)}
                        >
                            Legal
                        </button>
                        <DividingLine className='d-md-inline'>|</DividingLine>
                        <button 
                            className='btn btn-link px-2 text-decoration-none'
                            onClick={() => setShowTerms(true)}
                        >
                            Terms of Use
                        </button>
                    </nav>
                </div>
            </div>
        </FooterStyled>
        <LegalModal show={showLegal} onClose={() => setShowLegal(false)} />
        <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
        </>
    );
};

export default Footer;