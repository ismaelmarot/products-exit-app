import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import Step1GeneralData from './pages/Step1GeneralData/Step1GeneralData';
import Step2Products from './pages/Step2Products/Step2Products';
import Step3Preview from './pages/Step3Preview/Step3Preview';
import Step4PDF from "./pages/Step4PDF/Step4PDF";

function App() {
  const [key, setKey] = useState<string>('step1');

  return (
    <Container className='mt-4'>
      <h1 className='mb-4 text-center'>Products Exit App</h1>
      <Tabs
        id='salida-productos-tabs'
        activeKey={key}
        onSelect={(k) => k && setKey(k)}
        className='mb-3'
        justify
      >
        <Tab eventKey='step1' title="Datos Generales">
          <Step1GeneralData />
        </Tab>
        <Tab eventKey='step2' title="Productos">
          <Step2Products />
        </Tab>
        <Tab eventKey='step3' title="Previsualización">
          <Step3Preview />
        </Tab>
        <Tab eventKey='step4' title="PDF">
          <Step4PDF />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
