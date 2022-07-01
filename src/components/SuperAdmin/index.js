import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarSuperAdmin from '../NavBarSuperAdmin'

const SuperAdmin = () => {
    return (
        <>
            <NavBarSuperAdmin/>
            <Outlet/>
        </>
    )
}

export default SuperAdmin