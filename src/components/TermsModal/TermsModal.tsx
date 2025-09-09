import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getCurrentYear } from '../../helpers/getCurrentYear/getCurrentYear';
import type { TermsModalProps } from '../../interfaces/TermsModal.interface';
import { LinkStyled, StyledModalBody } from './TermsModal.styled';

const TermsModal: React.FC<TermsModalProps> = ({ show, onClose }) => {
  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      aria-labelledby='terms-modal-title'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='terms-modal-title'>Términos de uso</Modal.Title>
      </Modal.Header>
      <StyledModalBody>
        <p>
          Bienvenido a <strong>Products Entry App</strong>.
        </p>
        <p>
          Al acceder o utilizar este <i>Sitio/Aplicación</i>, acepta cumplir con estos Términos de uso. Si no está de acuerdo con ellos, le recomendamos no utilizar este <i>Sitio Web/Aplicación</i>.
        </p>
        <p>
          1. Propósito: Este <i>Sitio/Aplicación</i> tiene fines informativos y personales, mostrando proyectos desarrollados por Ismael Marot.
        </p>
        <p>
          2. Propiedad intelectual: Salvo que se indique lo contrario, el contenido, diseño y código fuente de este sitio se distribuyen bajo la <strong>licencia MIT</strong>, lo que significa que puede usar, copiar, modificar y distribuir el código, siempre que se conserve la atribución correspondiente.  
          <strong> Nota:</strong> Algunos contenidos (como logotipos, imágenes o textos) pueden no estar cubiertos por esta licencia y siguen siendo propiedad exclusiva de Ismael Marot.
        </p>
        <p>
          3. Uso permitido: Acepta utilizar este <i>Sitio/Aplicación</i> únicamente para fines legales y de acuerdo con estos <i>Términos de uso</i>. No está permitido:  
          <i>a)</i> Intentar dañar, interrumpir o acceder sin autorización al sitio.  
          <i>b)</i> Usar el contenido con fines ilícitos o engañosos.
        </p>
        <p>
          4. Exclusión de garantías: Este <i>Sitio Web/Aplicación</i> se proporciona <i>"tal cual"</i> y sin garantías de ningún tipo. No se garantiza que la información sea completa, precisa o actualizada.
        </p>
        <p>
          5. Limitación de responsabilidad: Ismael Marot no se hace responsable de ningún daño o pérdida derivados del uso o imposibilidad de uso de este <i>Sitio/Aplicación</i>.
        </p>
        <p>
          6. Cambios en los términos: Ismael Marot puede actualizar estos términos en cualquier momento. Las modificaciones se publicarán en esta misma página.
        </p>
        <p>
          7. Ley aplicable: Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa será sometida a los tribunales competentes de la Provincia de Buenos Aires.
        </p>
        <p>
          Contacto: Si tiene alguna duda sobre estos términos, consultas o inquietudes; escriba a{' '}
          <LinkStyled href='mailto:ismaelmarot@hotmail.com'>
            ismaelmarot@hotmail.com
          </LinkStyled>
        </p>
        <p>Última actualización: {getCurrentYear()}</p>
      </StyledModalBody>

      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsModal;
