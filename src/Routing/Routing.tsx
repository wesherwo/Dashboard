import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';
import CsvGraph from '../Pages/CsvGraph/CsvGraph.js';

export default function Routing() {
    return (
        <Routes>
            <Route path='/about' element={<About/>}/>
            <Route path='/csvgraph' element={<CsvGraph/>}/>
            <Route path='/' element={<Home/>}/>
        </Routes>
    );
}