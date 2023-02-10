import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import EditorPage from './pages/EditorPage';


import Home from './MyPages/Home';
import MainPage from './MyPages/MainPage';

function App() {
    // return (
    //     <>
    //         <BrowserRouter>
    //             <Routes>
    //                 <Route path="/" element={<Home />}></Route>
    //                 <Route
    //                     path="/editor/:projectId"
    //                     element={<EditorPage />}
    //                 ></Route>
    //             </Routes>
    //         </BrowserRouter>
    //     </>
    // );

    return <>
        {/* <Home/> */}
        <MainPage/>
    </>
}

export default App;
