/* eslint-disable no-unused-vars */
/*Paginas/Pages*/
import BackButton from "../components/BackButton";
import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePorteros } from '../Context/porterosContex';
// import { useAuth } from '../Context/authContext';
import { db } from '../firebase-config';
import {
    collection,
    onSnapshot,
  } from "firebase/firestore";

function Porteros() {
    
    const [datosTotales, setDatosTotales] = useState();

    const userCollectionRef = collection(db, "Porteros");

    const navigate = useNavigate();
    const { datosPorteros, actualizarDatosPorteros } = usePorteros();
    useEffect(() => {
        const getusers = onSnapshot(userCollectionRef,snapshot =>{
            setDatosTotales(snapshot.docs.map(doc=>({id: doc.id, data:doc.data()})))
        })
        
        return () => {
            getusers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    return(
        <div className="Main-Container">
            <BackButton/>
            <div className=" me-4 me-md-5 me-lg-5 me-xl-5 ms-4 ms-md-5 ms-lg-5 ms-xl-5 mt-5  mb-3 p-1">
                {datosTotales?
                    <div className="user-grid" >
                        {datosTotales.map((datos,index)=>(
                            <div className="user-card" key={index} 
                                onClick={()=>{
                                    actualizarDatosPorteros(datos.data);
                                    navigate("/Porteros/"+ datos.data.Nombre);
                                }}
                            >
                                <div className="user-info">
                                    <img src={datos.data.urlImage} alt={datos.data.Nombre} />
                                    <h3>{ datos.data.Nombre}</h3>
                                    <p>{ datos.data.Equipo}</p>
                                    <p>{datos.data.Edad + " Años"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                :
                    <></>
                }
            </div>
        </div>
    );
};

export default Porteros