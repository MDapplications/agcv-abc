import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react'
import Login from '../Login'
import Home from '../Home'
import ErrorPage from '../ErrorPage'
import Header from '../Header'
import SignUp from '../SignUp'
import ResumeSaison from '../ResumeSaison'
import ConsoVolants from '../ConsoVolants'
import ConsoTests from '../ConsoTests'
import HistoSaison from '../HistoSaison'
import Admin from '../Admin'
import Saisons from '../Saisons'
import Membres from '../Membres'
import PrixTubes from '../PrixTubes'
import ParamSaison from '../ParamSaison'
import Utilisateurs from '../Utilisateurs'
import TypeTubes from '../TypeTubes'
import Commandes from '../Commandes'
import Competitions from '../Competitions'


const App = () => {
  return (
    <Router>
        <Header/> 
    
            <Routes>
                <Route path="/" element={<Login/>}/>

                <Route path='/signup' element={<SignUp/>}/>
                        
                <Route path="/home" element={<Home/>}>
                    <Route index element={<ResumeSaison/>}/>
                    <Route path="consoVolants" element={<ConsoVolants/>}/>
                    <Route path="consoTests" element={<ConsoTests/>}/>
                </Route>
    
                <Route path="/commandes/:idSaison" element={<Commandes/>}/>
                <Route path="/competitions/:idSaison" element={<Competitions/>}/>

                <Route path="/admin" element={<Admin/>}>
                    <Route index element={<ParamSaison/>}/>
                    <Route path="saisons" element={<Saisons/>}/>
                    <Route path="membres" element={<Membres/>}/>
                    <Route path="prixtubes" element={<PrixTubes/>}/>
                    <Route path="users" element={<Utilisateurs/>}/>
                    <Route path="typetubes" element={<TypeTubes/>}/>
                </Route>

                <Route path="saison/:idSaison" element={<HistoSaison/>}>
                    <Route index element={<ResumeSaison/>}/>
                    <Route path="consoVolants" element={<ConsoVolants/>}/>
                    <Route path="consoTests" element={<ConsoTests/>}/>
                </Route>

                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
      
    </Router>
  )
}

export default App

