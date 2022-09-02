import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAllTypetubes } from '../../Redux/actions/typetubes'
import ModalChangePassword from '../ModalChangePassword'
import NavBarAdmin from '../NavBarAdmin'

const Admin = () => {

    //Redux
    const {role, token} = useSelector(state => state.user)
    const {isLoading, isGetSuccess, error} = useSelector(state => state.typetubes)

    //Hooks
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //States
    const [openModalChangePassword, setOpenModalChangePassword] = useState(false)

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

    const displayModalChangePassword = openModalChangePassword && <ModalChangePassword hideModal={() => setOpenModalChangePassword(false)}/>

    //render
    return (
        <>
            <NavBarAdmin showModalChangePassword={() => setOpenModalChangePassword(true)}/>
            <Outlet/>
            {displayModalChangePassword}
        </>        
    )
}

export default Admin