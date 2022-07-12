import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBarAdmin from '../NavBarAdmin'

const Admin = () => {

    //Redux
    const {role} = useSelector(state => state.user)


    //Hooks
    const navigate = useNavigate()


    //vérification des droits d'accès
    useEffect(() => {
        if (role < 2) {
            navigate('/home')

            toast.error('Accès non autorisé !',
            {
                style: {
                    border: '1px solid #d61b24',
                    padding: '16px',
                    color: '#d61b24',
                },
                duration: 5000,
            })
        }

    }, [role, navigate])


    //render
    return (
        <>
            <NavBarAdmin/>
            <Outlet/>
        </>        
    )
}

export default Admin