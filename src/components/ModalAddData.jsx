import React,{ useState } from "react";
/**Esta Libreria se instala: yarn add moment */
import moment from 'moment'
import { Modal, Button, Col, Container, Row, Form } from "react-bootstrap";
import { db, storage} from '../firebase-config';
import {
    doc,
    setDoc,
    collection,
    getDocs
  } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ModalAddData(props){
    const [docAmount, setdocAmount] = useState(0);
    /**Imagen */
    const [image, setImage] = useState("");//aqui se guarda la imagen
    const [imageProgress, setImageProgress] = useState({
        progreso: 0,
        state:"",
        imageUrl:"",
    });//barra de progreso

    const [validated, setValidated] = useState(true);
    const [datosLocales, setDatosLocales] = useState({
        urlImage: "",
        ID: "",
        Nombre:"",
        Equipo: "",
        Categoria: "",
        Ciudad: "",
        Fecha: "",
        Edad: "",
        Estatura: "",
        Peso: "",
        Telefono: "",
        EP: "",
        EP_Nombre: "",
        EP_Cel: "",
        Visoria: "",
    });

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

    const getDocAmount = async () => {
        const userCollectionRef = collection(db, 'Porteros');
        
        try {
          const querySnapshot = await getDocs(userCollectionRef);
          setdocAmount(querySnapshot.size+1);
        } catch (error) {
          console.error('Error al obtener la cantidad de documentos:', error);
        }
      };
    /*Subir los datos a firebase*/
    const subirDatos = async () => {
        /*al subir la imagen docAmount realiza un conteo de los documentos totales + 1, para guardarlo por orden*/
        await setDoc(doc(db,"Porteros",docAmount+"-" + datosLocales.ID), datosLocales);
        setDatosLocales({
            urlImage:"",
            ID: "",
            Nombre:"",
            Equipo: "",
            Ciudad: "",
            Fecha: "",
            Edad: "",
            Estatura: "",
            Peso: "",
            Telefono: "",
            EP: "",
            EP_Nombre: "",
            EP_Cel: "",
            Visoria: "",
        });
        props.onHide();
    }
    
    /* Funcion guardar datos*/
    const handleChange = ({target: {id, value}}) =>{
        if(id==="Fecha"){
            const fecha = value.split("-")[2] +"/" +value.split("-")[1] + "/" + value.split("-")[0];
            const edad = calcularEdad(fecha);
            if(edad > 6){
                value = "";
                document.getElementById("Edad").value = edad;
                setDatosLocales((prevDatos) => ({ ...prevDatos, Edad: edad.toString(), Fecha: fecha}));
            }
        }
        else{
            setDatosLocales((prevDatos) => ({ ...prevDatos, [id]: value }));
        }
        const ep_Nombre = document.getElementById("EP_Nombre");
        const ep_Cell = document.getElementById("EP_Cel");
        
        if(id === "EP"){
            if(document.getElementById(id).value === "SI"){
                ep_Nombre.required=true;
                ep_Nombre.disabled=false;
                ep_Cell.required=true;
                ep_Cell.disabled=false;
            }
            else{
                ep_Nombre.required=false;
                ep_Nombre.disabled=true;
                ep_Cell.required=false;
                ep_Cell.disabled=true;
            }
        }      
    }
    /**Funcion Caluclar Edad */
    const calcularEdad = (fecha) => {
        const hoy = new Date();
        let partesFecha = fecha.split('/');
    
        if (partesFecha.length !== 3) {
            // Verificar que haya tres partes (día, mes, año) en la fecha
            console.error("Formato de fecha no válido");
            return NaN;
        }
    
        // Crear la fecha en formato "mm/dd/yyyy"
        const fechaConvertida = `${partesFecha[1]}/${partesFecha[0]}/${partesFecha[2]}`;
        const cumpleanos = new Date(fechaConvertida);
    
        if (isNaN(cumpleanos.getTime())) {
            // Verificar si la fecha de nacimiento es válida
            console.error("Fecha de nacimiento no válida");
            return NaN;
        }
    
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    
        if (
            hoy.getMonth() < cumpleanos.getMonth() ||
            (hoy.getMonth() === cumpleanos.getMonth() && hoy.getDate() < cumpleanos.getDate())
        ) {
            // Si aún no ha pasado el cumpleaños de este año, resta un año
            edad--;
        }
    
        return edad;
    };

    /* variable config para usar un ciclo y ahorrar trabajo */
    const [addInf] = useState([
        {Type: "ID",Input:"text", wrong:"Validar con la base de datos"},
        {Type: "Nombre", Input:"text", wrong: "Ingrese un Nombre"},
        {Type: "Equipo", Input:"text", wrong: "Ingrese un Equipo"},
        {Type: "Categoria", Input:"text", wrong: "Ingrese categoria del Equipo"},
        {Type: "Ciudad", Input:"text", wrong: "Ingrese una Ciudad"},
        {Type: "Fecha", Input:"date", wrong: "Ingrese fecha en que Nacio"},
        {Type: "Edad", Input:"Edad", wrong: " Ingrese una edad adecuada"},
        {Type: "Estatura", Input:"Estatura", wrong: "No es un mutante"},
        {Type: "Peso", Input:"Peso", wrong: "Ingrese un peso real"},
        {Type: "Telefono", Input:"text", wrong: "Ingrese Num de telefono"},
        {Type: "EP", Input:"select", wrong: "Seleccione Opcion"},
        {Type: "EP_Nombre", Input:"EP", wrong: "Ingrese Nombre de EP"},
        {Type: "EP_Cel", Input:"EP", wrong: "Ingrese Num de telefono de EP"},
        {Type: "Visoria", Input:"text", wrong: "Ingrese Visoria"},
    ]);
    // Objeto de configuración para addInf
    const inputConfig = {
        text: {
            type: 'text',
            required: true,
        },
        EP: {
            type: 'text',
            disabled:true,
        },
        Estatura: {
            type: 'number',
            min: 1,
            max: 3,
            step: 0.01,
            required: true,
        },
        Edad: {
            type: 'number',
            disabled:true,
        },
        Peso: {
            type: 'number',
            min: 0,
            max: 300,
            step: 10,
        },
        date: {
            type: 'date',
            pattern: "(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}",
            min: moment('2000-01-01').format('YYYY-MM-DD'),
            max: moment(new Date()).subtract(10, 'years').endOf('year').format('YYYY-MM-DD'),
            required: true,
        },
        select: {
            type: 'select',
            options: ['SI', 'NO'], // Agrega tus opciones de selección
            required: true,
            },
        // Agrega más configuraciones según tus necesidades
    };

    const subirFoto = () =>{
        // antes de guardar la info a la db hacemos la subida de la imagen a storage
        if(image===""){
            alert("Suba una imagen Antes");
        }
        else{
            try {
                const nameFile = image.name;//Nombre de la foto
                const storageRef = ref(storage,'Images/'+nameFile); // concatenamos la ruta con el nombre y a la ves le decimos donde lo guardara
                const uploadTask = uploadBytesResumable(storageRef, image); // aqui subimos la imagen ala ruta especificada
                //Podran pasar 3 cosas: cambio de estado, fallo y se subio
                uploadTask.on('state_changed', 
                    (snapshot) => {
                        //Progreso con lo que se sube
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setImageProgress((prevDatos)=> ({...prevDatos,progreso: progress}));
                        // eslint-disable-next-line default-case
                        switch (snapshot.state) {
                            case 'paused':
                                /*console.log('Upload is paused');*/
                                setImageProgress((prevDatos)=> ({...prevDatos,state: "Paused"}));
                                break;
                            case 'running':
                                /*console.log('Upload is running');*/
                                setImageProgress((prevDatos)=> ({...prevDatos,state:"Subiendo"}));
                                break;
                        }
                    }, 
                    (error) => {
                        // Handle unsuccessful uploads
                    }, 
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setTimeout(()=>{},2000)
                            /*console.log('File available at', downloadURL);*/
                            setDatosLocales((prevDatos)=>({...prevDatos, urlImage: downloadURL}));
                            setImageProgress((prevDatos)=> ({...prevDatos, state:""}));
                            document.getElementById("btn-Guardar").disabled = false;
                            getDocAmount();
                        });
                    }
                );
    
            } catch (error) {
                console.log('error', error);
            }
        }
    }

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
                            <Col xs={4} md={4} lg={4} xl={4}>
                                Imagen
                            </Col>
                            <Col xs={8} md={8} lg={8} xl={8}>
                                <Form.Control className="form-control w-100"
                                type="file"
                                accept="image/*"
                                onChange={(e)=>{setImage(e.target.files[0])}}
                                required>
                                </Form.Control>
                            </Col>
                        </Row>
                        {addInf.map((info,index)=>{
                            const config = inputConfig[info.Input];
                            return(
                                <Row className="mt-1" key={index+"_"+info.type}>
                                    <Col >
                                        {info.Type}
                                    </Col>
                                    <Col xs={8} md={8} lg={8} xl={8}>
                                        <Form.Group >
                                            {config.options ? (
                                                <select 
                                                    className="form-control w-100"
                                                    id={info.Type}
                                                    placeholder={"Seleccione: " + info.Type}
                                                    {...config}
                                                    required={config && config.required}
                                                    onChange={handleChange}
                                                >
                                                    <option value={""}>Seleccione una Opcion</option>
                                                    {config.options.map((option, optionIndex) => (
                                                        <option value={option} key={option}>{option}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <Form.Control 
                                                autoComplete="off"
                                                className="w-100"
                                                id={info.Type}
                                                placeholder={"Ingrese: " + info.Type}
                                                {...config}
                                                required={config && config.required}
                                                disabled={config && config.disabled}
                                                onChange={handleChange}
                                                />
                                            )}
                                        <Form.Control.Feedback type="invalid">
                                            {info.wrong}
                                        </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )
                        })}
                        {imageProgress.state?
                            <Col xs={12} md={12} lg={12} xl={12}>
                                <div className="progress">
                                    <div className="progress-bar" style={{width: imageProgress.progreso.toFixed()+"%"}}>
                                        <span className="progress-bar-text">{imageProgress.progreso.toFixed()}%</span>
                                    </div>
                                </div>
                            </Col> 
                        :<></>}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button onClick={()=>{subirFoto();}}>Subir Foto</Button>
                    <Button type="submit" disabled id="btn-Guardar">Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );

}

export default ModalAddData;
