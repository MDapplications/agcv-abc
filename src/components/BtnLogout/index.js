import React from 'react'
import { BiPowerOff } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { initUser } from '../../Redux/actions/user'
import { initUsers } from '../../Redux/actions/users'
import { initTypetubes } from '../../Redux/actions/typetubes'
import { initPrixtubes } from '../../Redux/actions/prixtubes'
import { initMembres } from '../../Redux/actions/membres'
import { initSaisons } from '../../Redux/actions/saisons'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Popup } from 'semantic-ui-react'
import { initConsoVolants } from '../../Redux/actions/consovolants'
import { initConsoMois } from '../../Redux/actions/consomois'


const BtnLogout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {username} = useSelector(state => state.user)

    //bouton LogOut
    const handleLogout = () => {
        dispatch(initUser())
        dispatch(initUsers())
        dispatch(initTypetubes())
        dispatch(initPrixtubes())
        dispatch(initMembres())
        dispatch(initSaisons())
        dispatch(initConsoVolants())
        dispatch(initConsoMois())
        navigate('/')
    }

    //render
    return (
        <Popup
            trigger={
                <Button  
                    variant='danger'
                    onClick={handleLogout}>
                        <BiPowerOff/>
                </Button> 
            }
            content={`Déconnexion de ${username}`}
        />
    )
}

export default BtnLogout