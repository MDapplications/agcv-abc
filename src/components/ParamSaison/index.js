import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'

const ParamSaison = () => {


    const saisonActuelle = '2021 - 2022'

    //Hooks
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPage('admin'))
    }, [dispatch])


    return (
        <>
            <Container>
                <main role='main'>
                    <div className='mx-0 my-2 p-2 bg-light border rounded-3'>
                        <Container className='text-center justify-content-center'>
                            <div className='display-6'>Paramètres de la saison : {saisonActuelle}</div>
                        </Container>
                    </div>
                </main>
                <Container className='mt-5'>
                   
                </Container>
                
            </Container>

            {/*         
            {displayModalDelete}
            {displayModalEdit} 
            */}
    </>
    )
}

export default ParamSaison