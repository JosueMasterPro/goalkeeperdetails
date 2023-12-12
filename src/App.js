import { ProtectedRoute } from './helpers/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import { AuhtProvider } from './Context/authContext';
import { PorterosProvider } from './Context/porterosContex';
/* Importar Paginas */

import Login from './pages/Login';
import Main from './pages/Main';
import Resumen from './pages/Resumen';
import Porteros from './pages/Porteros';
import Entreno from './pages/Entreno';
import PorteroInfo from './pages/Porteros_Info'

function App() {
  return (
    <>
    <AuhtProvider>
        <PorterosProvider>
          <Routes>
            <Route path="/" element={
                      <ProtectedRoute>
                        <Main/>
                      </ProtectedRoute>
                    }/>
            <Route path='/login' element={ <Login/> }/>
            <Route path='/Porteros' element={<Porteros/>}/>
            <Route path='/Entreno' element={ <Entreno/> }/>
            <Route path='/Resumen' element={ <Resumen/> }/>
            <Route path="/Porteros/:ID" element={<PorteroInfo/>}/>
          </Routes>
        </PorterosProvider>
      </AuhtProvider>
    </>
  );
}

export default App;
