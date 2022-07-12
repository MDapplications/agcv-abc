import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {getPage} from '../../Redux/actions/pages'

const ResumeSaison = () => {

  //Hooks
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getPage('home'))
  }, [dispatch])
  

  //render
  return (
    <div>ResumeSaison</div>
  )
}

export default ResumeSaison