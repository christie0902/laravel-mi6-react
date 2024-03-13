import LeftMenu from './LeftMenu';
import Main from './Main';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './UserContext';
import { useEffect, useState } from 'react';

export default function App() {

    const [user, setUser] = useState(null)

    const getUser = async () => {
        const response = await fetch('/api/user');

        if (response.status == 200) {
            const data = await response.json();
            setUser(data)
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <>
            <UserContext.Provider value={{user, setUser, getUser}}>
                <BrowserRouter>
                    <LeftMenu/>
                    <Main />
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}