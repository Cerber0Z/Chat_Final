import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const register = () => {
        const { name, email, password, reEnterPassword } = user;
        if (name && email && password && password === reEnterPassword) {
            axios
                .post("https://intopcol-back.herokuapp.com/register", user)
                .then((res) => {
                    alert(res.data.message);
                    history.push("/login");
                });
        } else {
            alert("invlid input");
        }
    };

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Registro</h1>
            <input
                type="text"
                name="name"
                value={user.name}
                placeholder="Nombre"
                onChange={handleChange}
            ></input>
            <input
                type="text"
                name="email"
                value={user.email}
                placeholder="Email"
                onChange={handleChange}
            ></input>
            <input
                type="password"
                name="password"
                value={user.password}
                placeholder="Contraseña"
                onChange={handleChange}
            ></input>
            <input
                type="password"
                name="reEnterPassword"
                value={user.reEnterPassword}
                placeholder="Repetir Contraseña"
                onChange={handleChange}
            ></input>
            <div className="button" onClick={register}>
                Registrarse
            </div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>
                Iniciar Sesion
            </div>
        </div>
    );
};

export default Register;
