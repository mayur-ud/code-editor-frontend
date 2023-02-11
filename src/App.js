import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './MyPages/Home';
import MainPage from './MyPages/MainPage';
import Dummy from './MyPages/Dummy';


function App() {
    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/editor/:projectId"
                        element={<MainPage />}
                    ></Route>
                    <Route path='dummy' element={<Dummy />} />
                </Routes>
            </BrowserRouter>
        </>
    );

    return <MainPage/>
}

export default App;
