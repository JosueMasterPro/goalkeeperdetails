/*Paginas/Pages*/
import BackButton from "../components/BackButton";
import React from "react";
import { db } from '../firebase-config';
import { getDocs, collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
//queda en veremos esta opcion para un futuro
function Entreno() {
    const cambiarNombreDocumento = async (docId, nuevoNombre) => {
        const userCollectionRef = collection(db, 'Porteros');
        
        try {
          const querySnapshot = await getDocs(userCollectionRef);
          const documentoOriginal = querySnapshot.docs.find(doc => doc.id === docId);
    
          if (documentoOriginal) {
            const nuevoDocRef = doc(db, 'Porteros', nuevoNombre);
    
            // Copia los datos al nuevo documento
            await setDoc(nuevoDocRef, documentoOriginal.data());
    
            // Opcional: Elimina el documento original si lo deseas
            await deleteDoc(doc(db, 'Porteros', docId));
    
            console.log('Documento actualizado con nuevo nombre');
          } else {
            console.log('El documento original no existe');
          }
        } catch (error) {
          console.error('Error al cambiar nombre del documento:', error);
        }
      };
    
      return (
        <div className="Main-Container">
            <BackButton/>
            <div className="mt-5">
                <h3>Entreno</h3>
                <button onClick={() => cambiarNombreDocumento('', '')}>Cambiar Nombre del Documento</button>
            </div>
        </div>

      );
};
export default Entreno;