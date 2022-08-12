import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Popup, Table } from 'semantic-ui-react'
import { editConsoMois } from '../../Redux/actions/consomois'
import { initSaisons } from '../../Redux/actions/saisons'

const TableConsoMois = ({moisData, orderable}) => {

    //Hooks
    const dispatch = useDispatch()

    //Redux
    const {token} = useSelector(state => state.user)
    const {prixtubes} = useSelector(state => state.prixtubes)
    const {saisonActive} = useSelector(state => state.saisons)
    const {isLoadingEdit, isEditSuccess} = useSelector(state => state.consomois)

    //States
    const [prixData, setPrixData] = useState(0)
    const [nbTubesUsed, setNbTubesUsed] = useState(0)
    const [nbTubesOrdered, setNbTubesOrdered] = useState(0)
    const [moisId, setmoisId] = useState(0)
    const [loadConsoMois, setloadConsoMois] = useState(false)


    useEffect(() => {if (moisId !== 0) setPrixData(0)}, [moisId])
    useEffect(() => {if (isLoadingEdit) setloadConsoMois(true)}, [isLoadingEdit])
    useEffect(() => {
        if (loadConsoMois && isEditSuccess) {
          setloadConsoMois(false)
          dispatch(initSaisons())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [loadConsoMois, isEditSuccess, token])


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


    const handleChangePrixMois = (moisData) => {
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


    const handleChangeTubesUsedMois = (moisData) => {
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

    const handleChangeTubesOrderedMois = (moisData) => {
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

    const changePrixtube = moisData => {
        const idTypeTube = saisonActive.ConsoVolants.filter(data => data.id === moisData.idConsoVolant)[0].idTypeTube
        const listPrixtubes = prixtubes.filter(data => data.idTypeTube === idTypeTube && data.actif === true)
        const idPrixTube = moisData.PrixTube.id
            
        return (     
            <div className='d-flex justify-content-between pop-prix'>
                
                <Form.Select 
                    aria-label="Selection d'un prix du tube" 
                    className='me-2'
                    defaultValue={idPrixTube}
                    onChange={handleChangePrix}>
                        <option value='0'>Selection d'un prix du tube</option>
                        {displayOptionsPrix(listPrixtubes)}
                </Form.Select>

                <Button 
                color='blue' 
                disabled={isNaN(prixData) || prixData === 0}
                onClick={() => handleChangePrixMois(moisData)}>
                    Modifier
                </Button>
            </div>
        )
    }
    

    const changeNbTubesOrdered = moisData => {

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
                onClick={() => handleChangeTubesOrderedMois(moisData)}>
                    Modifier
            </Button>
        </div>
        )
    }


    const changeNbTubesUsed = moisData => {
        return (     
        <div className='d-flex justify-content-between pop-prix'>

            <Form.Control 
                id='nbTubesUsed'
                className='me-2'
                defaultValue={moisData.nbTubesUsed}
                onChange={handleNbTubesUsed}/>

            <Button 
                color='blue' 
                disabled={isNaN(nbTubesUsed) || nbTubesUsed < 0}
                onClick={() => handleChangeTubesUsedMois(moisData)}>
                    Modifier
            </Button>
        </div>
        )
    }

    const nbTubesUsedByOrder = moisData => {
        if (moisData.Commandes.length > 0) {
            const calculTubesUsed = moisData.Commandes.reduce((prevValue, commande) => {
                return prevValue + commande.nbTubesOrdered
            }, 0)
            return calculTubesUsed
        }
        return 0
    }


    const displayTubesUsed = orderable 
    ?   <Table.Cell id='td-mois' className='nbTubesUsed orderable' textAlign='center'>
            {moisData.nbTubesUsed + nbTubesUsedByOrder(moisData)}
        </Table.Cell>
    : <Popup
        trigger={
            <Table.Cell id='td-mois' className='nbTubesUsed' textAlign='center' onClick={() => setmoisId(moisData.id)}>
                    {moisData.nbTubesUsed}
            </Table.Cell>
        }
        content={changeNbTubesUsed(moisData)}
        on='click'
        position='right center'/>


    return (
        <Table.Row key={moisData.id}>

        {displayTubesUsed}

        <Table.Cell id='td-mois' textAlign='center'>
            {currencyLocalPrice(
                (moisData.nbTubesUsed * moisData.PrixTube.prix) +
                //(nbTubesUsedByOrder(moisData) * (moisData.PrixTube.prix - moisData.PrixTube.prixMembre)) 
                (nbTubesUsedByOrder(moisData) * moisData.PrixTube.prix)
            )}
        </Table.Cell>

        <Popup
            trigger={
                <Table.Cell id='td-mois' className='nbTubesOrdered' textAlign='center' onClick={() => setmoisId(moisData.id)}>
                    {moisData.nbTubesOrdered}
                </Table.Cell>
            }
            content={changeNbTubesOrdered(moisData)}
            on='click'
            position='right center'
        />


        <Table.Cell id='td-mois' textAlign='center'>
            {currencyLocalPrice(moisData.nbTubesOrdered * moisData.PrixTube.prix)}
        </Table.Cell>

        <Popup
            trigger={
                <Table.Cell id='td-mois' className='prix' textAlign='center' onClick={() => setmoisId(moisData.id)}>
                    {currencyLocalPrice(moisData.PrixTube.prix)}
                </Table.Cell>
            }
            content={changePrixtube(moisData)}
            on='click'
            position='left center'
        />

      </Table.Row>
    )
}

export default TableConsoMois