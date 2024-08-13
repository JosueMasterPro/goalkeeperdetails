import { ProtectedRoute } from './helpers/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import { AuhtProvider } from './Context/authContext';
import { PorterosProvider } from './Context/porterosContex';

/* Importar Paginas */
import Login from './pages/Login';
import Main from './pages/Main';
import Resumen from './pages/Resumen';
import Porteros from './pages/Porteros';
import PorteroInfo from './pages/Porteros_Info'
import Microciclos from './pages/Microciclos';
import Entreno from './pages/Entreno';
import Entrevista from './pages/Entrevista';

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
            <Route path='/Resumen' element={ <Resumen/> }/>
            <Route path='/Porteros' element={<Porteros/>}/>
            <Route path="/Porteros/:ID" element={<PorteroInfo/>}/>
            <Route path="/Microciclos" element={<Microciclos/>}/>
            <Route path='/Entreno' element={ <Entreno/> }/>
            <Route path='/Entrevista' element={ <Entrevista/> }/>
          </Routes>
        </PorterosProvider>
      </AuhtProvider>
    </>
  );
}

export default App;
