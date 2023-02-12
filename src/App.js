import './App.css';
import App1 from './components/Auth/App1';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './MyPages/Home';
import MainPage from './MyPages/MainPage';
import Dummy from './MyPages/Dummy';
import Auth from './components/Auth/App1';
import Def from './components/Editor/default';
import { Affix, Notification } from '@mantine/core';
import { useContext, useState } from 'react';
import StoreContext from './assets/StoreContext';


function App() {

    const { options , setOptions , cast} = useContext(StoreContext)
    
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
                    <Route path='/auth/login' element={<Auth show='login' />} />
                    <Route path='/auth/register' element={<Auth show='register' />} />
                    
                </Routes>
            </BrowserRouter>

            {options && <Affix position={{ top: 20, right: 20 }}>
            <Notification color={`${options.color ? options.color : 'teal'}`} title={options.title}>
                    {options.text}
            </Notification>
            </Affix>}

            {cast && <Affix position={{ bottom: 20, right: 20 }}>
            <Notification color={`${options.color ? options.color : 'teal'}`} title={options.title}>
                    {options.text}
            </Notification>
            </Affix>}
        </>
    );

}

export default App;
