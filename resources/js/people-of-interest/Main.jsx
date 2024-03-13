import People from "./People"
import { Routes, Route } from 'react-router-dom';
import Register from "./Register";
import { useContext } from "react";
import UserContext from "./UserContext";

export default function Main() {
    const { user } = useContext(UserContext)
    return (
        <main className="main">

            <div className="main__content">
                <Routes>
                    <Route path="/" element={
                        user ? <h1>Welcome to MI6, {user.name}</h1>
                        :
                         <h1>Welcome to MI6</h1>
                    } />
                    <Route path="/people-of-interest" element={ <People /> } />
                    <Route path="/register" element={ <Register /> } />

                </Routes>
            </div>

        </main>
    )
}