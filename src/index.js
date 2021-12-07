import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Search, Hotels, HotelInfo, NotFound } from "./pages";
import './index.css'

const App = () => {
    return (
      <div>
        <Routes>
          <Route path='/' element={<Search/>}/>
          <Route path='/hotels' element={<Hotels/>}/>
          <Route path='/hotelInfo' element={<HotelInfo/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </div>
    )
  }
  
  ReactDOM.render(<BrowserRouter>
                    <App />
                  </BrowserRouter>, document.getElementById("app"));