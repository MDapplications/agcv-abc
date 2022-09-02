import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { transferSaison } from '../../Redux/actions/saisons'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import ModalTemplate from '../ModalTemplate'

const ModalTransferSaison = ({hideModal}) => {

    const md = 6

    //Hooks
    const dispatch = useDispatch()

    //Redux
    const {saisons, saisonActive, isLoadingTransfer, isTransferSuccess, errorTransfer} = useSelector(state => state.saisons)
    const {token} = useSelector(state => state.user)

    //States
    const [transferNOK, setTransferNOK] = useState(true)
    const [noStock, setNoStock] = useState(true)
    const [saisonData, setSaisonData] = useState(null)
    const [requestTransfer, setRequestTransfer] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')



    useEffect(() => {
        if (saisonData === null && transferNOK && noStock) {
            console.log(saisonActive)
            if (saisonActive.Stocks.length > 0) {
                if (saisonActive.Stocks[0].value === 0) {
                    const dataFilter = saisons.filter(data => data.anneeFin === saisonActive.anneeDebut)
                    if (dataFilter.length > 0) {
                        setNoStock(false)
                        setSaisonData(dataFilter[0])
                    } else {
                        setNoStock(false)
                        setTransferNOK(false)
                    }
                } else {
                    setNoStock(false)
                    setTransferNOK(false)
                } 
            } else {
                setTransferNOK(false)
            } 
        }
    }, [saisonData, transferNOK, saisonActive, noStock, saisons])


    useEffect(() => {
        if (requestTransfer && !isLoadingTransfer && errorTransfer !== '') {
            setRequestTransfer(false)
            setErrorMsg(errorTransfer)
        }
    }, [requestTransfer, isLoadingTransfer, errorTransfer])

    useEffect(() => {
        if (requestTransfer && !isLoadingTransfer && isTransferSuccess && errorTransfer === '') {
            setRequestTransfer(false)
            hideModal()
            toast.success("Transfert de la saison réalisé avec succès !",
            {
                style: {
                    border: '1px solid #00B35B',
                    padding: '16px',
                    color: '#00B35B',
                },
                duration: 5000,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestTransfer, isLoadingTransfer, errorTransfer, isTransferSuccess])
    


    const handleConfirm = () => {
        setRequestTransfer(true)
        dispatch(transferSaison(token, saisonActive, saisonData))
    }
    

    const displayError = errorMsg !== '' && 
    <AlertDanger errorMsg={errorMsg} style={{width: '460px'}}/>


    const displayBtnConfirm = isLoadingTransfer || requestTransfer
    ? <Loader isMsg={false}/> : <Button variant='primary' disabled={!transferNOK || saisonData === null} onClick={handleConfirm}>Transférer</Button>


    const displaySaisonPrev = saisonData !== null 
    ? <Row className='mt-2'>
        <Col md={md}>
            <Form.Label className='mb-0 mt-2'>
                Saison précédente :
            </Form.Label>
        </Col>
        <Col md={md}>
            <Form.Label className='mb-0 mt-2'>
                <b>{saisonData.anneeDebut + ' - ' + saisonData.anneeFin}</b>
            </Form.Label>
        </Col>
    </Row>
    : <Row className='mt-2'>
        <Col md={md}>
            <Form.Label className='mb-0 mt-2'>
                Saison précédente :
            </Form.Label>
        </Col>
        <Col md={md}>
            <Form.Label className='mb-0 mt-2'>
                Aucune saison trouvée
            </Form.Label>
        </Col>
    </Row>

    const displayExplain = noStock
    ? <>
        <hr/>
        <Row className='mt-2 mx-1'>
            <p>La saison en cours ne possède pas de stock en base de données !</p>
            <p className='mb-0'>Pour éviter toute erreur de transfert, 
            fermer et réouvrir cette fenêtre peut résoudre le problème.</p>
        </Row>
    </>
    : <>
        <hr/>
        <Row className='mt-4 mx-1'>
            En cliquant sur "Transférer", vous enverez les stocks finaux de la saison précédentes 
            comme valeur d'initialisation à la saison en cours.
        </Row>
        <Row className='mt-2 mx-1'>
            Faites ceci seulement si vous venez de créer la saison en cours.
        </Row>
    </>


    // render
    return <ModalTemplate 
                hideModal={hideModal} 
                //styleBody={{width: '400px'}}
                title='Transfert de données entre saison'
                btnConfirm={displayBtnConfirm}>
                    {displayError}

                    <Form>
                        <Form.Group className='mb-3 mx-3 text-start'>

                            <Row className='mt-2'>
                                <Col md={md}>
                                    <Form.Label className='mb-0 mt-2'>
                                        Saison en cours :
                                    </Form.Label>
                                </Col>
                                <Col md={md}>
                                    <Form.Label className='mb-0 mt-2'>
                                        <b>{saisonActive.anneeDebut + ' - ' + saisonActive.anneeFin}</b>
                                    </Form.Label>
                                </Col>
                            </Row>

                            {displaySaisonPrev}
                            {displayExplain}
                                                        
                        </Form.Group>
                    </Form>
            </ModalTemplate>
}

export default ModalTransferSaison
