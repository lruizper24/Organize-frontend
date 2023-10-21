import { Link } from "react-router-dom";
import React from "react";

interface DefautlLayoutProps {
    children: React.ReactNode;
}

export default function DefautlLayout({children}: DefautlLayoutProps) {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/"> Inicio </Link>
                        </li>
                        <li>
                            <Link to="/signup"> Registrarme </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                {children}
            </main>
        
        </>
    )
}