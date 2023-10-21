import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import DefautlLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { API_URL } from "../auth/constants";
import type { AuthResponse, AuthResponseError } from "../types/types";

export default function Loging() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const auth = useAuth();
    //const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            
            if (response.ok) {
                console.log("Usuario creado correctamente");
                setErrorResponse("");
                const json = (await response.json()) as AuthResponse;
                
                if (json.body.accessToken && json.body.refreshToken) {
                    auth.saveUser(json);
                }

               goTo("/dashboard");
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
                <h1>Iniciar Sesión</h1>
                 {!!errorResponse && <div className="errorMessage"> {errorResponse} </div>}
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

            <button> Ingresar </button>
        </form>
    </DefautlLayout>
    );        
}
