import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import AlertDanger from '../AlertDanger'
import Loader from '../Loader'
import ModalTemplate from '../ModalTemplate'
import toast from 'react-hot-toast'


const ModalEditTemplate = ({hideModal, 
                            title,
                            styleBody,
                            styleAlert,
                            stateSelector,
                            actionRefreshData,
                            actionEdit,
                            children}) => {


    const {isEditSuccess, errorEdit, isLoadingEdit} = stateSelector

    //Hooks
    const dispatch = useDispatch()
     

    //States
    const [requestEdit, setRequestEdit] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')


    useEffect(() => {
        if (isEditSuccess) {
            setRequestEdit(false)
            dispatch(actionRefreshData())

            toast.success(`${title} réalisé avec succès !`,
            {
                style: {
                    border: '1px solid #00B35B',
                    padding: '16px',
                    color: '#00B35B',
                },
                duration: 5000,
            })

            hideModal()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditSuccess])


    useEffect(() => {
        if (requestEdit === true) {
            if (errorEdit !== '') {
                setRequestEdit(false)
                setErrorMsg(errorEdit)
            }
        }
    }, [requestEdit, errorEdit])



    const handleConfirm = () => {
        setRequestEdit(true)
        dispatch(actionEdit())
    }


    const displayError = errorMsg !== '' && 
    <AlertDanger errorMsg={errorMsg} style={styleAlert}/>


    const displayBtnEdit = isLoadingEdit
    ? <Loader isMsg={false}/> : <Button variant='primary' onClick={handleConfirm}>Modifier</Button>


    return (
        <ModalTemplate 
            hideModal={hideModal} 
            styleBody={styleBody}
            title={title}
            btnConfirm={displayBtnEdit}>

                {displayError}

                {children}
        </ModalTemplate>
    )
}

export default ModalEditTemplate