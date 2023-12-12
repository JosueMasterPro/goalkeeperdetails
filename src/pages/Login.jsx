import UserLogo from '../img/Logo-Honduras.jpg';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Login(){
    const [type, setType] = useState(true);
    const navigate = useNavigate();

    const handleSubmitLogin = async  (e) => {
        e.preventDefault();
        navigate("/");
    }
    
    return(
        <>
            {/* Cambiar este login por los que he guardado en Insta */}
            <div className="login-container">
                <div className="login">
                    <div className="avatar">
                        <img src={UserLogo} alt='Avatar'/>
                    </div>
                    <h2>Login <i className="bi bi-door-open"></i></h2>
                    <h3>Welcom <i className="bi bi-emoji-smile"></i></h3>
                    <form className="login-form" autoComplete="off">
                        <div className="textbox">
                        <input
                            type="email"
                            name="email"
                            // onChange={handlerChange}
                            className="form-control"
                            placeholder="Enter email"
                            />
                            <span className="material-symbols-outlined"><i className="bi bi-person-circle"></i></span>
                        </div>
                        <div className="textbox">
                            <input
                                type={type? "password":"text"}
                                name="password"
                                id="password"
                                // onChange={handlerChange}
                                className="form-control"
                                placeholder="Enter password"
                            />
                            <span className="material-symbols-outlined"><i className="bi bi-shield-lock"></i></span>
                            <span className="toggle"
                            type="button"
                            onClick={()=>{setType(!type)}}>
                                {type?<i className="bi bi-lock fs-5"></i>:<i className="bi bi-unlock fs-5"></i>}
                            </span>
                        </div>
                        <button className="login-btn" onClick={handleSubmitLogin}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Login;