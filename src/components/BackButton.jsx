import { useNavigate, useLocation } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();
    const location = useLocation()

    const Back = () =>{
        //console.log(location.pathname);
        var text = location.pathname.split("/");
        var direction = "";
        for(var i = 0; i < text.length; i++){
            text[i] = "/" + text[i];
            if(i > 0 && i < text.length-1){
                direction = direction + text[i];
            }
        }
        
        if(direction === ""){
            direction="/";
        }
        navigate(direction);
    }

    return(
        <>
            <button className="button" onClick={Back}>
                <svg className="svgIcon bi bi-arrow-left" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
            </button>
        </>
    );
};
