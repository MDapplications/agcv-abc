import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import NavBarHome from '../NavBarHome'

const Home = () => {

    //Redux
    const user = useSelector(state => state.user)


    //Hooks
    const navigate = useNavigate()


    useEffect(() => {if (user.token === '') navigate('/')}, [])
    


    //render
    return (
        <>
            <NavBarHome context='home'/>

            <main role='main'>
                <div className='p-2 bg-light border rounded-3'>
                    <Container className='text-center justify-content-center'>
                        <h1 className='display-4'>Saison : {'2021-2022'}</h1>
                        <hr className='m-0 mb-2'/>
                        <nav className='nav justify-content-center'>
                            <Link className='nav-link link-secondary' to=''>Résumé</Link>
                            <Link className='nav-link link-secondary' to='consoVolants'>Consommation des volants</Link>
                            <Link className='nav-link link-secondary' to='consoTests'>Consommation des volants d'essais</Link>
                        </nav>
                    </Container>
                </div>
            </main>

            <Outlet/>
        </>
        

    )
}

export default Home