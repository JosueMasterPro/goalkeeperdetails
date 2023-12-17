import BackButton from "../components/BackButton";
import AddButton from "../components/AddButton";
import ModalAddMicro from "../components/ModalAddMicro";

import { Table } from "react-bootstrap";

import LogoHonduras from "../img/Logo-Honduras.jpg"

import React, { useState, useEffect } from "react";

import {db} from '../firebase-config';
import {
    collection,
    onSnapshot,
  } from "firebase/firestore";

const Microciclos = () => {
    const [modalShow, setModalShow]  = useState(false);
    const [totalEntrenos, setTotalEntrenos] = useState(0); 
    const [microDatos,setMicroDatos] = useState(null);
    //Suma de todos los entrenos en microCiclos
    
    const userCollectionRef = collection(db, "Microciclos");
    useEffect(() => {
        const getusers = onSnapshot(userCollectionRef,snapshot =>{
            setMicroDatos(snapshot.docs.map(doc=>({id: doc.id, data:doc.data()})));
        })
        return () => {
            getusers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useEffect(()=>{
            if(microDatos){
                // eslint-disable-next-line array-callback-return
                microDatos.map((datos,index)=>{
                    setTotalEntrenos(microDatos.reduce((total) => total + datos.data.Entrenos, 0));
                }) 
            }
        },[microDatos]);

    return(
        <div className="Main-Container">
        <BackButton/>
            <div className="mt-5 MARGENES p-0">
                <div className="Micro-Container mt-2 fs-6">
                    <div className="Left-Logo Flex"> 
                        <img className="Logo_H img-fluid" src={LogoHonduras} alt="Honduras"/>
                    </div>
                    <div className="Micro-Header Flex">Microciclo H-20</div>
                    <div className="Right-Logo Flex"> 
                    <img className="Logo_H img-fluid" src={LogoHonduras} alt="Honduras"/>
                    </div>
                    <div className="Micro-Table table-responsive text-center">
                        <Table bordered className="Table-Pad">
                            <thead className="align-middle">
                                <tr>
                                    <th># Micro</th>
                                    <th>Fecha</th>
                                    <th>Lugar</th>
                                    <th>ID</th>
                                    <th>Portero</th>
                                    <th>Entreno Indiv</th>
                                    <th>Entrenos</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {microDatos?
                                    <>
                                        {microDatos.map((micro,index)=>(
                                            <React.Fragment key={index + "_" + micro.data.Fecha} >
                                                {micro.data.Porteros.map((portero,porteroIndex)=>(
                                                    <tr key={porteroIndex} className={"BG-"+index%2}>
                                                        {porteroIndex===0 && (
                                                            <>
                                                                <td rowSpan={micro.data.Porteros.length}>{index+1}</td>
                                                                <td rowSpan={micro.data.Porteros.length}>{micro.data.Fecha}</td>
                                                                <td rowSpan={micro.data.Porteros.length}>{micro.data.Lugar}</td>
                                                            </>
                                                        )}
                                                        <td>{portero.ID}</td>
                                                        <td>{portero.Nombre}</td>
                                                        <td>{portero.Entreno_Ind}</td>
                                                        {porteroIndex===0 && (
                                                            <>
                                                                <td rowSpan={micro.data.Porteros.length}>{micro.data.Entrenos}</td>
                                                            </>
                                                        )}
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </>
                                : 
                                <></>
                                }

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={6} className="text-end pe-3 fw-bolder">Total Entrenos</td>
                                    <td colSpan={1} className="fw-bolder">{totalEntrenos}</td>
                                </tr>
                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={2}>
                                        <div className="d-flex justify-content-center">
                                            <AddButton onClick={ () => setModalShow(true)}/>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    </div>
                </div>
            </div>
            <ModalAddMicro show={modalShow} onHide={() => setModalShow(false)}/>
        </div>
    )
}


export default Microciclos;