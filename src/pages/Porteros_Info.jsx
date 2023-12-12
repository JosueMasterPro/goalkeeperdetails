/*PorterosInfo*/
import BackButton from "../components/BackButton";
import { usePorteros } from '../Context/porterosContex';
import { Row, Col } from "react-bootstrap";

const Portero_Info = () =>{
    const { datosPorteros } = usePorteros();
    const num = [datosPorteros.Nombre]
    return(
        <div className="Main-Container">
            <BackButton/>
            {num[0]?
            <div className="me-5 ms-5 mt-5 p-0 Bordes fs-5">
                <Row className="border-row mt-2 fw-bolder justify-content-center">
                    Portero H-20
                </Row>
                <Row className="border-row text-center">
                    <Col className="border-col" xs={8} md={8} lg={8} xl={8}>
                    <i className="bi bi-person-arms-up"/> {datosPorteros.Nombre}
                    </Col>
                    <Col className="border-col" xs={4} md={4} lg={4} xl={4}>
                        Tel: {datosPorteros.Telefono}
                    </Col>
                </Row>
                <Row><Col xs={12} md={12} lg={12} xl={12}>&nbsp;</Col></Row>
                <Row className="text-center">
                    <Col className="p-3" xs={6} md={4} lg={4} xl={4}>
                        <img className="img-fluid rounded rounded-5 w-100" src={datosPorteros.urlImage} alt={datosPorteros.Nombre}/>
                    </Col>          
                    <Col className="align-items-center" xs={6} md={8} lg={8} xl={8}>
                        <Row xs={0} md={0} lg={12} xl={12} className="fs-6">&nbsp;</Row>
                        <Row className="">
                            <Col className="p-3" xs={4} md={4} lg={4} xl={4}>
                                <Row className="border-row p-0">
                                    Fecha Nacio
                                </Row>
                                <Row className="border-row p-0">
                                    {datosPorteros.Fecha}
                                </Row>
                            </Col>
                            <Col className="p-3" xs={4} md={4} lg={4} xl={4}>
                                <Row className="border-row p-0">
                                    Edad
                                </Row>
                                <Row className="border-row p-0">
                                    {datosPorteros.Edad}
                                </Row>
                            </Col>
                            <Col className="p-3" xs={4} md={4} lg={4} xl={4}>
                                <Row className="border-row p-0">
                                    Estatura
                                </Row>
                                <Row className="border-row p-0">
                                    {datosPorteros.Estatura}
                                </Row>
                            </Col>
                        </Row>
                        <Row className="">
                            <Col className="p-3" xs={4} md={4} lg={4} xl={4}>
                                <Row className="border-row p-0">
                                    Equipo 
                                </Row>
                                <Row className="border-row p-0">
                                    {datosPorteros.Equipo}
                                </Row>
                            </Col>
                            <Col className="p-3" xs={4} md={4} lg={4} xl={4}>
                                <Row className="border-row p-0">
                                    Categoria
                                </Row>
                                <Row className="border-row p-0">
                                    {datosPorteros.Edad}
                                </Row>
                            </Col>
                            <Col className="p-3" xs={4} md={4} lg={4} xl={4}>
                                <Row className="border-row p-0">
                                    Ciudad
                                </Row>
                                <Row className="border-row p-0">
                                    {datosPorteros.Ciudad}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            :
            <Row className="border-row fs-5 fw-bolder justify-content-center">
                Vuelva atras y no recargue la pagina
            </Row>
            }
        </div>
    )
}

export default Portero_Info;