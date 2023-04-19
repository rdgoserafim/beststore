import './App.css';
import { useState } from 'react';
import { CNavbar, CCollapse, CContainer, CNavbarToggler } from '@coreui/react';

import Gallery from './pages/store/Gallery';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="App">
        <>
            <CCollapse id="navbarToggleExternalContent" visible={visible}>
              <div className="bg-dark p-4">
                <h5 className="text-white h4">Best Store</h5>
                <span className="text-medium-emphasis-inverse">Menu de Navegação.</span>
              </div>
            </CCollapse>
            <CNavbar colorScheme="dark" className="bg-dark">
              <CContainer fluid>
                <CNavbarToggler
                  aria-controls="navbarToggleExternalContent"
                  aria-label="Toggle navigation"
                  onClick={() => setVisible(!visible)}
                />
              </CContainer>
            </CNavbar>
          </>

          <Gallery />
      {/* <header className="App-header">
        
      </header> */}
    </div>
  );
}

export default App;
