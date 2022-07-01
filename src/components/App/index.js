import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import Login from '../Login'
import Home from '../Home'
import ErrorPage from '../ErrorPage'
import Header from '../Header'
import Footer from '../Footer'
import SignUp from '../SignUp'
import ResumeSaison from '../ResumeSaison'
import ConsoVolants from '../ConsoVolants'
import ConsoTests from '../ConsoTests'
import HistoSaison from '../HistoSaison'
import Admin from '../Admin'
import Saisons from '../Saisons'
import Membres from '../Membres'
import PrixTubes from '../PrixTubes'
import SuperAdmin from '../SuperAdmin'
import ParamSaison from '../ParamSaison'
import Utilisateurs from '../Utilisateurs'
import ApercuGlobal from '../ApercuGlobal'
import TypeTubes from '../TypeTubes'


const App = () => {
  return (
    <Router>
      <Header/> 
 
         <Routes>
          <Route path="/" element={<Login/>}/>

          <Route path='/signup' element={<SignUp/>}/>
         
          <Route path="/histoSaison" element={<HistoSaison/>}/>
          
          <Route path="/home" element={<Home/>}>
            <Route index element={<ResumeSaison/>}/>
            <Route path="consoVolants" element={<ConsoVolants/>}/>
            <Route path="consoTests" element={<ConsoTests/>}/>
          </Route>

          

          <Route path="/admin" element={<Admin/>}>
            <Route index element={<ParamSaison/>}/>
            <Route path="saisons" element={<Saisons/>}/>
            <Route path="membres" element={<Membres/>}/>
            <Route path="prixtubes" element={<PrixTubes/>}/>
          </Route>

          <Route path="/superAdmin" element={<SuperAdmin/>}>
            <Route index element={<ApercuGlobal/>}/>
            <Route path="users" element={<Utilisateurs/>}/>
            <Route path="typetubes" element={<TypeTubes/>}/>
          </Route>
 
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>

      <Footer/> 
      
    </Router>
  )
}

export default App

