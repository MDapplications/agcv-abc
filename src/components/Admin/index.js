import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarAdmin from '../NavBarAdmin'

const Admin = () => {
    return (
        <>
            <NavBarAdmin/>
            <Outlet/>
        </>        
    )
}

export default Admin