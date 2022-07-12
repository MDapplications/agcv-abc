import React from 'react'
import { BiPowerOff } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { initUser } from '../../Redux/actions/user'
import { initUsers } from '../../Redux/actions/users'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Popup } from 'semantic-ui-react'


const BtnLogout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {username} = useSelector(state => state.user)

    //bouton LogOut
    const handleLogout = () => {
        dispatch(initUser())
        dispatch(initUsers())
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