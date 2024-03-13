import LeftMenu from './LeftMenu';
import Main from './Main';
import './App.scss';
import {useState} from "react";

export default function App() {

    const [content, setContent] = useState('')

    return (
        <>
            <LeftMenu content={content} setContent={setContent}/>
            <Main content={content} setContent={setContent}/>
        </>
    )
}
