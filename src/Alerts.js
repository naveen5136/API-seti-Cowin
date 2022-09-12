import React from 'react'

import { Alert } from 'react-bootstrap'

const Alerts=(props)=> {
  return (
    <div> 
        {props.alertCode==='1' ? ( <Alert variant='success'>OTP sent to {props.mobile}</Alert>)
         : 
         props.alertCode==='2' ? (<Alert variant='success'>OTP validate Successful</Alert>) 
         : 
         props.alertCode==='3' ? (<Alert variant='error'>Error</Alert>)
          : ('')}
    </div>
  )
}

export default Alerts