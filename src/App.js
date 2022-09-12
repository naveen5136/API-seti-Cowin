import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import Demo from './Demo';
import Alerts from './Alerts'; 
import { Card,FloatingLabel,Form } from 'react-bootstrap';

export default function App() {
  var crypto = require('crypto')
  const [mobile, setMobile] = useState('');
  const[mobileError,setMobileError]=useState('')
  const [txnId, setTxnId] = useState('');
  const [otp, setOTP] = useState('');
  const[alertCode,setAlertCode]=useState('')
  const[otpToken,setOtpToken]=useState('')

  const[value,setValue]=useState('')
  const[states,setStates]=useState([])
  
const vallidateMobile=(e)=>{
  setMobile(e.target.value)
  if(mobile.length=='' || mobile.length<9 ){
    setMobileError('invalid mobile')
  } else if(mobile.length >= 10){
    setMobileError('mobile no. is excessive')
  } else (
    setMobileError('valid mobile')
  )
}
  const handleSubmit = (e) => {
   
    axios
      .post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
        mobile: mobile,
      })
      .then((resp) => {
        const token=resp.data
        setTxnId(String(resp.data.txnId))
        localStorage.setItem('txnId', token.txnId);
        console.log("txnid",token.txnId);
        setAlertCode('1')
        alert('success')
      })
      .catch((err) => {
        console.log('Error');
        setAlertCode('3') 
        alert("some error")
      });
  }; 

  const handleVerify = () => { 
    axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',{
      otp: otpSha256,
     txnId : localStorage.getItem('txnId') })
     .then((resp)=>{
      const nav= resp.data
      setOtpToken(String(resp.data.token))
      localStorage.setItem('token',nav.token)
      console.log(nav.token)
     alert('You Login Successful')
     })
     .catch((err)=>{
      console.log('Error in Verify')
     })
  };

  var otpSha256 = crypto.createHash('sha256').update(otp).digest('hex')

  //select State
  const selectState = (e) =>{
    setValue(e.target.value)
  } 

useEffect(()=>{ 
  axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states',{
    header:{
      "Accept-Language" : "en_US"
    }
  })
  .then((resp)=>{
    console.log(resp.data)
    setStates(resp.data.states)
    console.log(states[0])
  })
},[])

  return (
    <>
      <Card className="Card" style={{boxShadow: "2px 3px 5px #888888",backgroundColor:'white'}}>
       <Card.Header> Sign Up </Card.Header>
       
       <label>Enter you mobile no.</label>
      <input value={mobile} type="number" onChange={(e) => vallidateMobile(e)} />
      <button onClick={handleSubmit}> submit</button>
      {mobile} <br /> <br /> 
      <h1>{mobileError}</h1>
      <label> Enter OTP</label>{' '}
      <input type="number" onChange={(e) => setOTP(e.target.value)} />
      <button onClick={handleVerify}>Verify</button> 
       <div>
      {/* <label >Select State
       <select value={value} onChange={selectState}>
        <option value="haryana">Haryana</option>
        <option value="delhi">Delhi</option>
        <option value="up">UP</option>
       </select>
      </label> */}
      </div> 
    <select value={value} onChange={selectState}> {states.map(state=>
      <option key={states.state_id} value={state.state_name}>{state.state_name}</option>)}
    </select>
   {value}
   <Demo />
   </Card>
    </>
  );
}
