import React from 'react'
import { BiPowerOff } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { initUser } from '../../Redux/actions/user'
import { initUsers } from '../../Redux/actions/users'
import { useNavigate } from 'react-router-dom'



const BtnLogout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //bouton LogOut
    const handleLogout = () => {
        dispatch(initUser())
        dispatch(initUsers())
        navigate('/')
    }

    //render
    return (
        <>
            <button 
                type="button" 
                className="btn btn-danger" 
                onClick={handleLogout}>
                    <BiPowerOff/>
            </button>

            {/* <ReactTooltip id="buttonLogout" place="left" effect="solid"/> */}
        </>
    )
}

export default BtnLogout