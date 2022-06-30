import React from 'react'
//import ReactTooltip from 'react-tooltip'
import { HiOutlineLogout } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { initUser } from '../../Redux/actions/user'
import { useNavigate } from 'react-router-dom'



const BtnLogout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //bouton LogOut
    const handleLogout = () => {
        dispatch(initUser())
        navigate('/')
    }

    //render
    return (
        <>
            <button 
                type="button" 
                className="btn btn-danger" 
                onClick={handleLogout}>
                    <HiOutlineLogout/>
            </button>

            {/* <ReactTooltip id="buttonLogout" place="left" effect="solid"/> */}
        </>
    )
}

export default BtnLogout