import { useNavigate } from "react-router-dom";
import { useState } from "react";
/**Fotos/Image */
import Resumen from "../img/Resumen.jpg"
import Porteros from "../img/Porteros.jpg"
import Microciclo from "../img/Microciclo.jpg"
import Temas from "../img/Entreno.jpg"
import Entrevista from "../img/Entrevista.jpg"
import Partidos from "../img/partidos.jpg"


function Main(){
    const navigate = useNavigate();

    const [loadPage] = useState([
        {Nombre: "Resumen", imagen: Resumen, url: "Resumen"},
        {Nombre: "Porteros", imagen: Porteros, url: "Porteros"},
        {Nombre: "Microciclos", imagen: Microciclo, url: "Microciclos"},
        {Nombre: "Temas de Entreno", imagen: Temas, url: "Entreno"},
        {Nombre: "Entrevista EP", imagen: Entrevista, url: "Entrevista"},
        {Nombre: "Partidos", imagen: Partidos, url: "Partidos"},
    ]);



    return(
        <div className="Main-Container" async>
            <div className="Main-Cards-Container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
                    {loadPage.map((Page,index)=>(
                            <div className="col" key={index} onClick={()=>{navigate("/"+Page.url);}}>
                                <div className="card text-dark">
                                    <img async src={Page.imagen} 
                                        className="card-img" 
                                        alt={Page.Nombre} 
                                        loading="lazy"/>
                                    <div className="card-img-overlay">
                                    <h5 className="card-title text-center bg-light">{Page.Nombre}</h5>
                                    <p className="card-text"></p>
                                    <p className="card-text"></p>
                                    </div>
                                </div>
                        </div>   
                    ))}
                </div>
            </div>
        </div>    
    )
}
export default Main;
