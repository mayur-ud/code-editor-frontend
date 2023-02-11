import './App.css';
import App1 from './components/Auth/App1';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './MyPages/Home';
import MainPage from './MyPages/MainPage';
import Dummy from './MyPages/Dummy';
import Auth from './components/Auth/App1';
import Def from './components/Editor/default';


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
                    <Route path='/dummy' element={<Dummy />} />
                    <Route path='/auth/login' element={<Auth show='login'/>} />
                    <Route path='/auth/register' element={<Auth show='register'/>} />
                    
                </Routes>
            </BrowserRouter>
        </>
    );

}

export default App;