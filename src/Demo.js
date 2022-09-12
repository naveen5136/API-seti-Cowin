import React from 'react'
import  {Button,Alert}  from '@mui/material'

function Demo() {
  return (
    <div>Demo
        <Button variant="contained" onClick={()=>{alert('You click')}}> Hi </Button>
    </div>
  )
}

export default Demo