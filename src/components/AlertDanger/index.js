import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertDanger = ({errorMsg}) => {
  return (
    <Alert key='danger' variant='danger'>
        {errorMsg}
    </Alert>
  )
}

export default AlertDanger