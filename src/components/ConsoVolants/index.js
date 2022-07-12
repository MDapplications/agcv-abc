import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'

const ConsoVolants = () => {

  //Hooks
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getPage('consoVolants'))
  }, [dispatch])


  return (
    <div>ConsoVolants</div>
  )
}

export default ConsoVolants