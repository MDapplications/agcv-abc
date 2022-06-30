import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarAdmin from '../NavBarAdmin'

const Admin = () => {
    return (
        <>
            <NavBarAdmin context/>
            <Outlet/>
        </>        
    )
}

export default Admin