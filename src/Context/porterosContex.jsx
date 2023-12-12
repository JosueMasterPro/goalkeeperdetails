import React, { createContext, useContext, useState } from 'react';

const porterosContext = createContext();

export const PorterosProvider = ({ children }) => {
  const [datosPorteros, setDatosPorteros] = useState([]);

  const actualizarDatosPorteros = (nuevosDatos) => {
    setDatosPorteros(nuevosDatos);
  };

  return (
    <porterosContext.Provider value={{ datosPorteros, actualizarDatosPorteros }}>
      {children}
    </porterosContext.Provider>
  );
};

export const usePorteros = () => {
  const context = useContext(porterosContext);
  if (!context) {
    throw new Error('usePorteros debe usarse dentro de un PorterosProvider');
  }
  return context;
};