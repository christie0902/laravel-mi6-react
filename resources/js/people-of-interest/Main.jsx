import People from "./People"
import Home from "./Home.jsx";

export default function Main({content}) {

    let selectedContent = ''
    switch (content) {
        case '':
            selectedContent = <Home/>
            break;
        case 'people-of-interest':
            selectedContent = <People/>
            break;
    }

    return (
        <main className="main">
            <div className="main__content">
                {selectedContent}
            </div>

        </main>
    )
}
