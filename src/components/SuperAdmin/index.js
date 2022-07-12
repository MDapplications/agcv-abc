import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBarSuperAdmin from '../NavBarSuperAdmin'

const SuperAdmin = () => {

    //Redux
    const {role} = useSelector(state => state.user)


    //Hooks
    const navigate = useNavigate()


    //vérification des droits d'accès
    useEffect(() => {
        if (role < 3) {
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
            <NavBarSuperAdmin/>
            <Outlet/>
        </>
    )
}

export default SuperAdmin