import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAllTypetubes } from '../../Redux/actions/typetubes'
import NavBarAdmin from '../NavBarAdmin'

const Admin = () => {

    //Redux
    const {role, token} = useSelector(state => state.user)
    const {isLoading, isGetSuccess, error} = useSelector(state => state.typetubes)

    //Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    //Récupération de la saison actuelle
    useEffect(() => {
        if (!isLoading && !isGetSuccess && error ==='') {
            dispatch(getAllTypetubes(token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, isGetSuccess, isLoading, error])

    //render
    return (
        <>
            <NavBarAdmin/>
            <Outlet/>
        </>        
    )
}

export default Admin