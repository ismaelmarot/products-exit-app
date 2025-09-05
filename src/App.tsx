import { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import Step1GeneralData from './pages/Step1GeneralData/Step1GeneralData';
import Step2Products from './pages/Step2Products/Step2Products';
import Step3Preview from './pages/Step3Preview/Step3Preview';
import Step4PDF from "./pages/Step4PDF/Step4PDF";
import Footer from "./components/Footer/Footer";

function App() {
  const [key, setKey] = useState<string>('step1');

  const handleNext = () => {
    if (key === 'step1') setKey('step2');
    else if (key === 'step2') setKey('step3');
    else if (key === 'step3') setKey('step4');
  };

  const handleBack = () => {
    if (key === 'step4') setKey('step3');
    else if (key === 'step3') setKey('step2');
    else if (key === 'step2') setKey('step1');
  };

  return (
    <div className='d-flex flex-column align-items-center min-vh-100'>
      <Container className='flex-fill mt-4' style={{margin:'0'}}>
        <h1 className='mb-4 text-center'>Products Exit App</h1>
        <Tabs
          id='salida-productos-tabs'
          activeKey={key}
          onSelect={(k) => k && setKey(k)}
          className='mb-3'
          justify
        >
          <Tab eventKey='step1' title="1. Datos Generales">
            <Step1GeneralData onNext={() => setKey('step2')} />
          </Tab>
          <Tab eventKey='step2' title="2. Productos">
            <Step2Products
              initialProducts={[]}
              onNext={handleNext}
              onBack={handleBack}
            />
          </Tab>
          <Tab eventKey='step3' title="3. Previsualización">
            <Step3Preview />
          </Tab>
          <Tab eventKey='step4' title="4. Final / PDF">
            <Step4PDF />
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
