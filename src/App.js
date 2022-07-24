import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=> {
  const [progress, setProgress] = useState(0)
  const setAProgress=(progress)=>{
    setProgress(progress)
  }
    return (
      <div>
        <Router>
        <Navbar/>
          <LoadingBar color='#f11946' progress={progress} height={3}/>
          <Routes>
            <Route exact path="/" element={<News setProgress={setAProgress} key="general" country="in" category="general"/>} />
            <Route exact path="/home" element={<News setProgress={setAProgress} key="general" country="in" category="general"/>} />
            <Route exact path="/general" element={<News setProgress={setAProgress} key="general" country="in" category="general"/>} />
            <Route exact path="/sports" element={<News setProgress={setAProgress} key="sports" country="in" category="sports"/>} />
            <Route exact path="/science" element={<News setProgress={setAProgress} key="science" country="in" category="science"/>} />
            <Route exact path="/entertainment" element={<News setProgress={setAProgress} key="entertainment" country="in" category="entertainment"/>} />
            <Route exact path="/business" element={<News setProgress={setAProgress} key="business" country="in" category="business"/>} />
            <Route exact path="/technology" element={<News setProgress={setAProgress} key="technology" country="in" category="technology"/>} />
            <Route exact path="/health" element={<News setProgress={setAProgress} key="health" country="in" category="health"/>} />
          </Routes>
          <Footer/>
        </Router>
      </div>
    )
  }
export default App