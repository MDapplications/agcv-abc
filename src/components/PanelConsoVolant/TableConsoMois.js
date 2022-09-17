import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Popup, Table } from 'semantic-ui-react'
import { editConsoMois } from '../../Redux/actions/consomois'
import { getSaisonActive } from '../../Redux/actions/saisons'

const TableConsoMois = ({saison, moisData, orderable}) => {

    //Hooks
    const dispatch = useDispatch()

    //Redux
    const {token, role} = useSelector(state => state.user)
    const {saisonActive} = useSelector(state => state.saisons)
    const {prixtubes} = useSelector(state => state.prixtubes)
    const {isLoadingEdit, isEditSuccess} = useSelector(state => state.consomois)

    //States
    const [prixData, setPrixData] = useState(0)
    const [nbTubesUsed, setNbTubesUsed] = useState(0)
    const [nbTubesOrdered, setNbTubesOrdered] = useState(0)
    const [moisId, setmoisId] = useState(0)
    const [loadConsoMois, setloadConsoMois] = useState(false)
    const [actionValid, setActionValid] = useState(true)


    useEffect(() => {if (moisId !== 0) setPrixData(0)}, [moisId])
    useEffect(() => {if (isLoadingEdit) setloadConsoMois(true)}, [isLoadingEdit])
    useEffect(() => {
        if (loadConsoMois && isEditSuccess) {
          setloadConsoMois(false)
          dispatch(getSaisonActive(token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [loadConsoMois, isEditSuccess, token])
    
    useEffect(() => {
        if (actionValid) { 
            if (role >= 2) {
                if (saison.id !== saisonActive.id) {
                    setActionValid(false)
                }
            } else {
                setActionValid(false)
            }
        }
    }, [actionValid, saison, saisonActive, role])
    


    //Affichage au format prix
    const currencyLocalPrice = prix => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prix)


    const handleChangePrix = event => setPrixData(Number(event.target.value))
    const handleNbTubesUsed = event => setNbTubesUsed(Number(event.target.value))
    const handleNbTubesOrdered = event => setNbTubesOrdered(Number(event.target.value))

    const displayOptionsPrix = listPrixtubes => listPrixtubes.length > 0 &&
    listPrixtubes.map(prixtube => <option 
                                        key={prixtube.id} 
                                        value={prixtube.id}>
                                            {`${prixtube.marque} (${currencyLocalPrice(prixtube.prix)})`}
                                </option>)


    const handleChangePrixMois = () => {
        const data = {
            id: moisData.id,
            idConsoVolant: moisData.idConsoVolant,
            name: moisData.name,
            nbTubesOrdered: moisData.nbTubesOrdered,
            nbTubesUsed: moisData.nbTubesUsed,
            idPrixTube: prixData
        }
        dispatch(editConsoMois(token, data))
    }


    const handleChangeTubesUsedMois = () => {
        const data = {
            id: moisData.id,
            idConsoVolant: moisData.idConsoVolant,
            name: moisData.name,
            nbTubesOrdered: moisData.nbTubesOrdered,
            nbTubesUsed: nbTubesUsed,
            idPrixTube: moisData.idPrixTube
        }
        dispatch(editConsoMois(token, data))
    }

    const handleChangeTubesOrderedMois = () => {
        const data = {
            id: moisData.id,
            idConsoVolant: moisData.idConsoVolant,
            name: moisData.name,
            nbTubesOrdered: nbTubesOrdered,
            nbTubesUsed: moisData.nbTubesUsed,
            idPrixTube: moisData.idPrixTube
        }
        dispatch(editConsoMois(token, data))
    }

    const changePrixtube = () => {
        const idTypeTube = saison.ConsoVolants.filter(data => data.id === moisData.idConsoVolant)[0].idTypeTube
        const listPrixtubes = prixtubes.filter(data => data.idTypeTube === idTypeTube && data.actif === true)
        let idPrixTube = 0
        if (moisData.PrixTube !== null) {
            idPrixTube = moisData.PrixTube.id
        }
                        
        return (     
            <div className='d-flex justify-content-between pop-prix'>
                
                <Form.Select 
                    aria-label="Selection d'un prix du tube" 
                    className='me-2'
                    defaultValue={idPrixTube}
                    disabled={!actionValid}
                    onChange={handleChangePrix}>
                        <option value='0'>Selection d'un prix du tube</option>
                        {displayOptionsPrix(listPrixtubes)}
                </Form.Select>

                <Button 
                color='blue' 
                disabled={isNaN(prixData) || prixData === 0 || !actionValid}
                onClick={handleChangePrixMois}>
                    Modifier
                </Button>
            </div>
        )
    }
    

    const changeNbTubesOrdered = () => {

        return (     
        <div className='d-flex justify-content-between pop-prix'>

            <Form.Control 
                id='nbTubesOrdered'
                className='me-2'
                defaultValue={moisData.nbTubesOrdered}
                onChange={handleNbTubesOrdered}/>

            <Button 
                color='blue' 
                disabled={isNaN(nbTubesOrdered) || nbTubesOrdered < 0}
                onClick={handleChangeTubesOrderedMois}>
                    Modifier
            </Button>
        </div>
        )
    }


    const changeNbTubesUsed = () => {
        return (     
        <div className='d-flex justify-content-between pop-prix'>

            <Form.Control 
                id='nbTubesUsed'
                className='me-2'
                type='number'
                min={0}
                defaultValue={moisData.nbTubesUsed}
                onChange={handleNbTubesUsed}/>

            <Button 
                color='blue' 
                disabled={isNaN(nbTubesUsed) || nbTubesUsed < 0}
                onClick={handleChangeTubesUsedMois}>
                    Modifier
            </Button>
        </div>
        )
    }

    const nbTubesUsedByOrder = () => {
        if (moisData.Commandes.length > 0) {
            return moisData.Commandes.reduce((prevValue, commande) => {
                return prevValue + commande.nbTubesOrdered
            }, 0)
        }
        return 0
    }

    const nbTubesUsedByRestock = () => {
        if (moisData.Restocks.length > 0) {
            return moisData.Restocks.reduce((prevValue, restock) => {
                return prevValue + restock.value
            }, 0)
        }
        return 0
    }


    const displayTubesUsed = orderable 
    ?   <Table.Cell id='td-mois' className='nbTubesUsed orderable' textAlign='center'>
            {moisData.nbTubesUsed + nbTubesUsedByOrder() + nbTubesUsedByRestock()}
        </Table.Cell>
    : <Popup
        trigger={
            <Table.Cell id='td-mois' className='nbTubesUsed' textAlign='center' onClick={() => setmoisId(moisData.id)}>
                    {moisData.nbTubesUsed}
            </Table.Cell>
        }
        content={changeNbTubesUsed()}
        on='click'
        position='right center'
        disabled={!actionValid}/>


    return (
        <Table.Row key={moisData.id}>

        {displayTubesUsed}

        <Table.Cell id='td-mois' textAlign='center'>
            {moisData.PrixTube !== null ?
                currencyLocalPrice(
                (moisData.nbTubesUsed * moisData.PrixTube.prix) +
                //(nbTubesUsedByOrder(moisData) * (moisData.PrixTube.prix - moisData.PrixTube.prixMembre)) 
                (nbTubesUsedByOrder() * moisData.PrixTube.prix) + 
                (nbTubesUsedByRestock() * moisData.PrixTube.prix)
            ) : currencyLocalPrice(0)}
        </Table.Cell>

        <Popup
            trigger={
                <Table.Cell id='td-mois' className='nbTubesOrdered' textAlign='center' onClick={() => setmoisId(moisData.id)}>
                    {moisData.nbTubesOrdered}
                </Table.Cell>
            }
            content={changeNbTubesOrdered()}
            on='click'
            position='right center'
            disabled={!actionValid}/>


        <Table.Cell id='td-mois' textAlign='center'>
            {moisData.PrixTube !== null ? currencyLocalPrice(moisData.nbTubesOrdered * moisData.PrixTube.prix) : currencyLocalPrice(0)}
        </Table.Cell>

         
        <Popup
            trigger={  
                <Table.Cell id='td-mois' className='prix' textAlign='center' onClick={() => setmoisId(moisData.id)}>
                    {moisData.PrixTube !== null ? currencyLocalPrice(moisData.PrixTube.prix) : currencyLocalPrice(0)}
                </Table.Cell>
            }
            content={changePrixtube()}
            on='click'
            position='left center'/>
        
      </Table.Row>
    )
}

export default TableConsoMois