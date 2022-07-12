import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertDanger = ({errorMsg, style}) => {
  return (
    <Alert key='danger' variant='danger' style={style}>
        {errorMsg}
    </Alert>
  )
}

export default AlertDanger