import React, { useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'

const ApercuGlobal = () => {

    //Hooks
    const dispatch = useDispatch()

    //Redux
    const {saisonActive} = useSelector(state => state.saisons)

    useEffect(() => {
        dispatch(getPage('superAdmin'))
    }, [dispatch])


    //Affichage au format prix
    const currencyLocalPrice = prix => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)
    }


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
                    <Card bg='secondary' key='Secondary' text='white'>
                        <Card.Body>
                            <Card.Title>
                                Saison en cours : {saisonActive.anneeDebut + ' - ' + saisonActive.anneeFin}
                            </Card.Title>
                            <Card.Text>
                                Budget : {currencyLocalPrice(saisonActive.budget)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
                
            </Container>
    </>
    )
}

export default ApercuGlobal