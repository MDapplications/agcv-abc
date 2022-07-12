import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import ModalTemplate from '../ModalTemplate'

const ModalCreateTemplate = ({  hideModal,
                                title,
                                styleBody,
                                styleAlert,
                                stateSelector,
                                actionCreate,
                                actionRefreshData,
                                children}) => {
   
 

    const {isCreateSuccess, errorCreate, isLoadingCreate} = stateSelector


    //Hooks
    const dispatch = useDispatch()


    //States
    const [requestCreate, setRequestCreate] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    
    useEffect(() => {
        if (isCreateSuccess) {
            setRequestCreate(false)
            dispatch(actionRefreshData())
            hideModal()
        }
    }, [isCreateSuccess])
    

    useEffect(() => {
        if (requestCreate === true) {
            if (errorCreate !== '') {
                setRequestCreate(false)
                setErrorMsg(errorCreate)
            }
        }
    }, [requestCreate, errorCreate])

    

    const handleCreate = () => { 
        setRequestCreate(true)     
        dispatch(actionCreate())
    }


    const displayError = errorMsg !== '' && 
    <AlertDanger errorMsg={errorMsg} style={styleAlert}/>


    const displayBtnCreate = isLoadingCreate
    ? <Loader isMsg={false}/> : <Button variant='primary' onClick={handleCreate}>Créer</Button>
    
    
    return (
        <ModalTemplate 
            hideModal={hideModal} 
            styleBody={styleBody}
            title={title}
            btnConfirm={displayBtnCreate}>

                {displayError}

                {children}
        </ModalTemplate>
    )
}

export default ModalCreateTemplate