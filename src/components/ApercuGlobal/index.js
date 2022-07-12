import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'

const ApercuGlobal = () => {

    //Hooks
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPage('superAdmin'))
    }, [dispatch])


    //render
    return (
        <>
            <Container>
                <main role='main'>
                    <div className='m-2 p-2 bg-light border rounded-3'>
                        <Container className='text-center justify-content-center'>
                            <div className='display-6'>Aperçu global</div>
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

export default ApercuGlobal