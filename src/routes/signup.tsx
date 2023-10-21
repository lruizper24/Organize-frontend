import DefautlLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "../types/types";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password,
                }),
            });

            if (response.ok) {
                console.log("Usuario creado correctamente");
                setErrorResponse("");

                goTo("/");
            } else {
                console.log("Algo salió mal!");
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />
    }

    return (
    <DefautlLayout>
    <form className="form" onSubmit={handleSubmit}>
        <h1>Registrarme</h1>
        {!!errorResponse && <div className="errorMessage"> {errorResponse} </div>}
                
        <label> Nombre </label>
            <input 
                type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}/>

        <label> Correo Electrónico </label>
            <input 
                type="text"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}/>                    

        <label> Usuario </label>
            <input 
                type="text"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}/>                

        <label> Contraseña </label>
            <input 
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>              

        <button> Crear usuario </button>
        </form>
        </DefautlLayout>
    );        
}