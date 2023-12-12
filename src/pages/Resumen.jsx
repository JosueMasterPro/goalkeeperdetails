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
                <div className="container mt-5 p-0"> 
                    <div className="row row-cols-auto mt-2 ">
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 order-0 A p-0">
                            <img className="Logo_H align-start" src={LogoHonduras} alt="Honduras"/>
                        </div>
                        <div className="col-4 col-sm-1 col-md-1 col-lg-1 col-xl-1 order-1">

                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 order-4 order-sm-2 order-md-2 order-lg-2 order-xl-2 B p-0">
                            <p className="fs-4">Resumen</p>
                            <p className="fs-4">Visoria: Josue Reyes</p>
                        </div>
                        <div className="col-4 col-sm-1 col-md-1 col-lg-1 col-xl-1 order-2 order-sm-3 order-md-3 order-lg-3 order-xl-3">

                        </div>
                        <div className="C col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 order-3 order-sm-4 order-md-4 order-lg-4 order-xl-4 p-0">
                            <img className="Logo_H float-end me-3" src={LogoHonduras} alt="Honduras"/>
                        </div>
                    </div>
                    {/* No.	ID	NOMBRE	EQUIPO	CIUDAD	NACIO	EDAD	TALLA	PESO	TELEFONO	EP	NOMBRE	TELEFONO	VISORIA */}
                    <div className="table-responsive mt-3">
                        <table className="table table-hover table-bordered table-sm align-middle text-center">
                            <thead>
                                <tr>
                                    <th scope="col">N</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Equipo</th>
                                    <th scope="col">Ciudad</th>
                                    <th scope="col">Nacio</th>
                                    <th scope="col">Edad</th>
                                    <th scope="col">Talla</th>
                                    <th scope="col">Peso</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Ep</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Telefono</th>
                                    <th scope="col">Visoria</th>
                                </tr>
                            </thead>
                            <tbody>
                            {datosTotales?
                            <>
                                {datosTotales.map((info, index) => (
                                    <tr key={index+"_"+info.data.Telefono}>
                                        <th scope="row">{index+1}</th>
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
                        </table>
                    </div>
                </div>
                <ModalAddData show={modalShow} onHide={() => setModalShow(false)}/>
            </div>
        </>
    );
};

export default Resumen;