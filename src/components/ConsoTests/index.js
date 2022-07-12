import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPage } from '../../Redux/actions/pages'

const ConsoTests = () => {

  //Hooks
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getPage('consoTests'))
  }, [dispatch])


  return (
    <div>ConsoTests</div>
  )
}

export default ConsoTests