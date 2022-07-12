import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'
import NavBarHome from '../NavBarHome'

const HistoSaison = () => {
      

    //Redux
    const page = useSelector(state => state.page)

    //Hooks
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getPage('histoSaison'))
    }, [dispatch])

    return (
        <>
            <NavBarHome context={page}/>
            <div>HistoSaison</div>
        </>
    )
}

export default HistoSaison