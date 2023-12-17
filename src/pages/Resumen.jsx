/*Buttons/Botones*/
import AddButton from "../components/AddButton";
import BackButton from "../components/BackButton";

/*images*/
import LogoHonduras from "../img/Logo-Honduras.jpg"

import ModalAddData from "../components/ModalAddData";

import { useState, useEffect } from "react";
// import { useAuth } from '../Context/authContext';
import {db} from '../firebase-config';
import {
    collection,
    onSnapshot,
  } from "firebase/firestore";
import { Table } from "react-bootstrap";

 function Resumen() {
    const [modalShow, setModalShow]  = useState(false); 
    const [datosTotales, setDatosTotales] = useState();

    const userCollectionRef = collection(db, "Porteros");


    useEffect(() => {
        const getusers = onSnapshot(userCollectionRef,snapshot =>{
            setDatosTotales(snapshot.docs.map(doc=>({id: doc.id, data:doc.data()})))
        })
        
        return () => {
            getusers()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    
    return(
        <>
            <div className="Main-Container">
                <BackButton/>
                <div className="Micro-Container mt-5 MARGENES p-0"> 
                    <div className="Left-Logo Flex"> 
                            <img className="Logo_H img-fluid" src={LogoHonduras} alt="Honduras"/>
                        </div>
                        <div className="Micro-Header Flex">Microciclo H-20</div>
                        <div className="Right-Logo Flex"> 
                        <img className="Logo_H img-fluid" src={LogoHonduras} alt="Honduras"/>
                    </div>
                    {/* No.	ID	NOMBRE	EQUIPO	CIUDAD	NACIO	EDAD	TALLA	PESO	TELEFONO	EP	NOMBRE	TELEFONO	VISORIA */}
                    <div className="Micro-Table table-responsive mb-5 text-center">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>N</th>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Equipo</th>
                                    <th>Ciudad</th>
                                    <th>Nacio</th>
                                    <th>Edad</th>
                                    <th>Talla</th>
                                    <th>Peso</th>
                                    <th>Telefono</th>
                                    <th>Ep</th>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Visoria</th>
                                </tr>
                            </thead>
                            <tbody>
                            {datosTotales?
                            <>
                                {datosTotales.map((info, index) => (
                                    <tr key={index+"_"+info.data.Telefono}>
                                        <th>{index+1}</th>
                                        <td>{info.data.ID}</td>
                                        <td>{info.data.Nombre}</td>
                                        <td>{info.data.Equipo}</td>
                                        <td>{info.data.Ciudad}</td>
                                        <td>{info.data.Fecha}</td>
                                        <td>{info.data.Edad}</td>
                                        <td>{info.data.Estatura}</td>
                                        <td>{info.data.Peso}</td>
                                        <td>{info.data.Telefono}</td>
                                        <td>{info.data.EP}</td>
                                        <td>{info.data.EP_Nombre}</td>
                                        <td>{info.data.EP_Cel}</td>
                                        <td>{info.data.Visoria}</td>
                                    </tr>
                            ))}
                            </> 
                            :
                            <>
                                <tr key={"TR"}></tr>
                            </> }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan={"12"}></th>
                                    <td colSpan={"2"} className="">
                                        <div className="d-flex justify-content-center">
                                        {/* Boton para mostrar el modal(solo es el diseño del boton) */}
                                            <AddButton onClick={ () => setModalShow(true)}/>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    </div>
                </div>
                <ModalAddData show={modalShow} onHide={() => setModalShow(false)}/>
            </div>
        </>
    );
};

export default Resumen;