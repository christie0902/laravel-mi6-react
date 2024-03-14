import { useContext } from "react";
import { Routes, Route } from 'react-router-dom';

import UserContext from "./UserContext";

import People from "./People"
import Register from "./Register";
import Home from "./Home";
import Missions from "./Mission";


export default function Main({content}) {
    
    // const { user } = useContext(UserContext)

    let selectedContent = ''
    switch (content) {
        case '':
            selectedContent = <Home/>
            break;
        case 'people-of-interest':
            selectedContent = <People/>
            break;
        case 'missions':
                selectedContent = <People/>
                break;
    }
    return (
        <main className="main">
            <div className="main__content">
                <Routes>
                    <Route path="/" element={
                        // user ? <h1>Welcome to MI6, {user.name}</h1>
                        // :
                         <h1>Welcome to MI6</h1>
                    } />
                    <Route path="/people-of-interest" element={ <People /> } />
                    <Route path="/mission" element={ <Missions /> } />
                    <Route path="/register" element={ <Register /> } />

                </Routes>

                {selectedContent}
            </div>

        </main>
    )
}
