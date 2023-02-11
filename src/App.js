import './App.css';
import App1 from './components/Auth/App1';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './MyPages/Home';
import MainPage from './MyPages/MainPage';

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
                </Routes>
            </BrowserRouter>
        </>
    );

    return <MainPage/>
}

export default App;
