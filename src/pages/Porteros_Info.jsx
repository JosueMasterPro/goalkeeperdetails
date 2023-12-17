/*PorterosInfo*/
import BackButton from "../components/BackButton";
import { usePorteros } from '../Context/porterosContex';
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const Portero_Info = () =>{
    const { datosPorteros } = usePorteros();
    const num = [datosPorteros.Nombre];

    useEffect(() => {
        // Obtener todos los elementos que tienen clases que comienzan con Info-
        const elementos = document.querySelectorAll('[class^="Info-"]');

        // Iterar sobre los elementos y aplicar el estilo dinámico
        elementos.forEach((elemento) => {
            aplicarEstiloDinamico(elemento);
        });
    }, []); // El array vacío indica que useEffect se ejecutará solo una vez después del montaje

    function aplicarEstiloDinamico(elemento) {
        const clases = elemento.className.split(' ');

        // Verificar cada clase
        clases.forEach(clase => {
            /*console.log('Clase actual:', clase);*/

            if (clase.startsWith('Info-')) {
                // Lógica para clases Info-i
                const i = clase.match(/\d+/);
                if (i) {
                    if(i[0]!=="13"){
                        elemento.style.display = 'grid';
                        elemento.style.gridTemplateColumns = '1fr';
                        elemento.style.gridTemplateRows = '1fr 1fr';
                        elemento.style.gap = '0px 0px';
                        elemento.style.gridAutoFlow = 'row';
                        elemento.style.gridTemplateAreas = `"I-${i}-1" "I-${i}-2"`;
                    }
                }
            }
        });
    }

    return(
        /*Buscar otro diseño para esta pagina que no sea con bootstrap*/ 
        <div className="Main-Container">
            <BackButton/>
            {num[0]?
            <div className="mt-5 p-0 MARGENES">
                <div className="Porteros-Container mt-2 fs-6">
                    <div className="Header-Info">
                            <Col xs={12} className="text-center Borde-Bajo">
                                Portero Sub-20
                            </Col>
                        <Row className="mb-1 mt-1">
                            <Col xs={8} md={8} lg={8} xl={8} className="border-end border-black text-center">
                                {datosPorteros.Nombre}
                            </Col>
                            <Col xs={4} md={4} lg={4} xl={4} className="text-center">
                                Tel: {datosPorteros.Telefono}
                            </Col>
                        </Row>
                    </div>
                    <div className="Info-Image p-2">
                        <img src={datosPorteros.urlImage} alt={datosPorteros.Nombre} className="img-fluid" ></img>
                    </div>
                    <div className="Info-1">
                        <div className="I-1-1">ID</div>
                        <div className="I-1-2">{datosPorteros.ID}</div>
                    </div>
                    <div className="Info-2">
                        <div className="I-2-1">Fecha Nacio</div>
                        <div className="I-2-2">{datosPorteros.Fecha}</div>
                    </div>
                    <div className="Info-3">
                        <div className="I-3-1">Edad</div>
                        <div className="I-3-2">{datosPorteros.Edad}</div>
                    </div>
                    <div className="Info-4">
                        <div className="I-4-1">Estatura</div>
                        <div className="I-4-2">{datosPorteros.Estatura}</div>
                    </div>
                    <div className="Info-5">
                        <div className="I-5-1">Equipo</div>
                        <div className="I-5-2">{datosPorteros.Equipo}</div>
                    </div>
                    <div className="Info-6">
                        <div className="I-6-1">Categoria</div>
                        <div className="I-6-2">{datosPorteros.Categoria}</div>
                    </div>
                    <div className="Info-7">
                        <div className="I-7-1">Ciudad</div>
                        <div className="I-7-2">{datosPorteros.Ciudad}</div>
                    </div>
                    <div className="Info-8">
                        <div className="I-8-1">Peso</div>
                        <div className="I-8-2">{datosPorteros.Peso}</div>
                    </div>                
                    <div className="Info-9">
                        <div className="I-9-1">
                                Entrevistas Ep
                        </div>
                        <div className="I-9-2">{datosPorteros.Peso}</div>
                    </div>
                    <div className="Info-10">
                        <div className="I-10-1">Ep</div>
                        <div className="I-10-2">{datosPorteros.EP_Nombre}</div>
                    </div>
                    <div className="Info-11">
                        <div className="I-11-1">Microciclos</div>
                        <div className="I-11-2">{datosPorteros.Peso}
                        </div>
                    </div>
                    <div className="Info-12">
                        <div className="I-12-1">Entrenos</div>
                        <div className="I-12-2">{datosPorteros.Peso}</div>
                    </div>
                    <div className="Info-13">
                        <div className="I-13-1">Partidos</div>
                        <div className="I-13-2">A:</div>
                        <div className="I-13-3">O:</div>
                    </div>
                </div>
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