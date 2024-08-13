import React,{ useState, useEffect } from "react";
import { Modal, Button, Col, Container, Row, Form } from "react-bootstrap";
import { db } from '../firebase-config';
import {
    doc,
    setDoc,
    collection,
    onSnapshot,
  } from "firebase/firestore";

function ModalAddMicro(props){

    const [porteroCount,setPorteroCount] = useState(Number(0));

    const [porterosTotales, setPorterosTotales] = useState();

    const [validated, setValidated] = useState(true);
    const [datosLocales, setDatosLocales] = useState({
        Fecha: "",
        Lugar: "",
        Porteros: [
            {
                ID: "",
                Nombre:"",
                Entreno_Ind: 0,
            },
        ],
        Entrenos: 0,
    });
    /*Variable Complementaria de datos Locales*/
    const [porteros, setPorteros] = useState([
        {
          ID: '',
          Nombre: '',
          Entreno_Ind: Number(0),
        },
    ]);

    /*Chequear Todos los campos*/
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }else{
        event.preventDefault();
        event.stopPropagation();
        subirDatos();
    }
      setValidated(true);
    };

    /*Subir los datos a firebase*/
    const subirDatos = async () => {
        /*al subir la imagen docAmount realiza un conteo de los documentos totales + 1, para guardarlo por orden*/
        await setDoc(doc(db,"Microciclos", datosLocales.Fecha), datosLocales);
        setDatosLocales({
            Fecha: "",
            Lugar: "",
            Porteros: [
                {
                    ID: "",
                    Nombre:"",
                    Entreno_Ind: Number(0),
                },
            ],
            Entrenos: Number(0),
        });
        setPorteroCount(Number(0));
        props.onHide();
    }
    
    /* Funcion guardar datos*/
    const handleChange = ({target: {id, value}}) =>{
        if(id==="Entrenos"){
            setDatosLocales((prevDatos) => ({ ...prevDatos, [id]: Number(value) }));
        }
        else{
            setDatosLocales((prevDatos) => ({ ...prevDatos, [id]: value }));
        }
    }

    const handleChangePortero = (e, index) => {
        const { name, value } = e.target;
    
        // Crear una copia del array de porteros
        const nuevosPorteros = [...porteros];
        
        if(name === "Nombre"){
            const { options } = e.target;
            const nombre = options[options.selectedIndex].text;
            document.getElementById("ID_" + index).value=value;

            // Actualizar el portero específico según el índice
            nuevosPorteros[index] = {
            ...nuevosPorteros[index],
            Nombre: nombre,
            ID: value
          };
        }
        else{
            // Actualizar el portero específico según el índice
            nuevosPorteros[index] = {
                ...nuevosPorteros[index],
                [name]: Number(value),
            };
        }
        // Actualizar el estado con la nueva información del portero
        setPorteros(nuevosPorteros);
        setDatosLocales((prevDatos) => ({...prevDatos,"Porteros": nuevosPorteros}))
      };

    const userCollectionRef = collection(db, "Porteros");

    useEffect(() => {
        const getusers = onSnapshot(userCollectionRef,snapshot =>{
            setPorterosTotales(snapshot.docs.map(doc=>({id: doc.id, data:doc.data()})));
        });
        
        return () => {
            getusers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);


    return(
        <Modal {...props} 
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        size="lg"
        centered>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Agregar un Portero
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                    <Container>
                        <Row className="mt-1">
                            <Col >
                                Fecha
                            </Col>
                            <Col xs={8} md={8} lg={8} xl={8}>
                                <Form.Control 
                                    type="date"
                                    autoComplete="off"
                                    className="w-100"
                                    id="Fecha"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col >
                                Lugar
                            </Col>
                            <Col xs={8} md={8} lg={8} xl={8}>
                                <Form.Control 
                                    autoComplete="off"
                                    type="text"
                                    className="w-100"
                                    id="Lugar"
                                    placeholder={"Ingrese El Lugar"}
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="mt-2" >
                                Entrenos
                            </Col>
                            <Col className="mt-2" xs={8} md={8} lg={8} xl={8}>
                                <Form.Control 
                                    autoComplete="off"
                                    type="number"
                                    className="w-100"
                                    id="Entrenos"
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-3 border-top border-black">
                            <Row className="mt-3">
                                <Col xs={8} md={8} lg={8} xl={8}>
                                    <div className="text-center fs-5">Porteros</div>
                                </Col>
                                <Col xs={2} md={2} lg={2} xl={2}>
                                    <button onClick={
                                        () =>{
                                            if(porteroCount!==0){
                                                setPorteroCount((prevDatos)=>prevDatos-1)
                                            }
                                        }}
                                        className="BTN-Menos">-</button>
                                </Col>
                                <Col xs={2} md={2} lg={2} xl={2}>
                                    <button onClick={()=>{
                                        if(porteroCount < 4){
                                            setPorteroCount((prevDatos)=>prevDatos+1)}
                                        }
                                    } 
                                        className="BTN-Mas">+</button>
                                </Col>
                            </Row>
                        </Row>

                        {Array.from({ length: porteroCount }, (_, index) => (
                            <Row key={index} className="">
                                <Row className="border-bottom border-black">
                                    <div className="text-center mt-3">PORTERO {index+1}</div>
                                </Row>
                                <Row>
                                    <Col className="text-center" xs={4} md={4} lg={4} xl={4}>
                                        ID    
                                    </Col>    
                                    <Col className="text-center" xs={4} md={4} lg={4} xl={4}>
                                        Nombre
                                    </Col>    
                                    <Col className="text-center" xs={4} md={4} lg={4} xl={4}>
                                        Entreno Individual
                                    </Col>    
                                </Row>
                                <Col xs={4} md={4} lg={4} xl={4}>
                                    <Form.Control className="text-center" type="text" disabled id={"ID_" +index}>

                                    </Form.Control>
                                </Col>
                                <Col xs={4} md={4} lg={4} xl={4}>
                                    <select 
                                        className="form-control w-100"
                                        name="Nombre"
                                        required
                                        onChange={(e) => handleChangePortero(e, index)}
                                    >
                                        <option value="" defaultValue={""}>Seleccione una Opcion</option>
                                        {porterosTotales.map((portero,index)=>(
                                            <React.Fragment key={index}>
                                                <option value={portero.data.ID}>{portero.data.Nombre}</option>
                                            </React.Fragment>
                                        ))}
                                    </select>
                                </Col>
                                <Col xs={4} md={4} lg={4} xl={4}>
                                    <Form.Control 
                                        autoComplete="off"
                                        type="number"
                                        className="w-100"
                                        name="Entreno_Ind"
                                        min={1}
                                        required
                                        onChange={(e) => handleChangePortero(e, index)}
                                    />
                                </Col>
                            </Row>
                        ))}

                        
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button type="submit" id="btn-Guardar">Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}

export default ModalAddMicro;
