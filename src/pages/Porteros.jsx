/* eslint-disable no-unused-vars */
/*Paginas/Pages*/
import BackButton from "../components/BackButton";
import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePorteros } from '../Context/porterosContex';
// import { useAuth } from '../Context/authContext';
import {db} from '../firebase-config';
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
            <div className="me-5 ms-5 mt-5 p-0">
                {datosTotales?
                    <Row >
                        {datosTotales.map((datos,index)=>(
                          <Col xs={12} md={4} lg={4} xl={3} key={index}>
                            <div className="card mb-3" style={{height:"250px"}} 
                                onClick={()=>{
                                    actualizarDatosPorteros(datos.data);
                                    navigate("/Porteros/"+ datos.data.Nombre);
                                }}
                            >
                                <div className="row g-0" style={{height:"100%"}}>
                                    <Col xs={6} md={6} lg={6} xl={6}>
                                        <img src={datos.data.urlImage} 
                                            className="img-fluid rounded-start" 
                                            alt={datos.data.Nombre} 
                                            loading="lazy"
                                            style={{height:"250px"}}
                                        />
                                    </Col>
                                    <Col xs={6} md={6} lg={6} xl={6}>
                                        <div className="card-body fs-6">
                                            <h5 className="card-title">{datos.data.Nombre}</h5>
                                            <p className="card-text">Equipo: {datos.data.Equipo}</p>
                                            <p className="card-text">Edad: {datos.data.Edad}</p>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                          </Col>  
                        ))}
                    </Row>
                :
                    <></>
                }
            </div>
        </div>
    );
};

export default Porteros