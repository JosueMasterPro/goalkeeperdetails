import React from "react";
//import { useEffect, useState } from "react";

import BackButton from "../components/BackButton";

function Entrevista() {
    
    return(
        <div className="Main-Container">
            <BackButton/>
            <div className="mt-5 MARGENES p-0">
                <h1>Probando</h1>
                <h1>Scores</h1>
                {/* <div className="user-grid" >
                    {scores.response.map((score, index) => (
                       <div className="user-card" key={index}>
                       <div className="user-info">
                           <img src={score.thumbnail} alt={score.title} />
                           <h3>{ score.title}</h3>
                           <p>{score.competition}</p>
                           <p>{score.date}</p>
                           <a href={score.competitionUrl}>Table</a>
                       </div>
                   </div>
                    ))}
                </div> */}
                
            </div>    
        </div>
        
    )
}


export default Entrevista;