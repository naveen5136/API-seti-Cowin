import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

export default function App() {
  var crypto = require('crypto')
  const [mobile, setMobile] = useState('');
  const [txnId, setTxnId] = useState('');
  const [otp, setOTP] = useState('');
  const[otpToken,setOtpToken]=useState('')

  const handleSubmit = () => {
    axios
      .post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
        mobile: mobile,
      })
      .then((resp) => {
        const token=resp.data
        setTxnId(String(resp.data.txnId))
        localStorage.setItem('txnId', token.txnId);
        console.log(token.txnId);
      })
      .catch((err) => {
        console.log('Error');
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
     cAlert('You Login Successful')
     })
     .catch((err)=>{
      console.log('Error in Verify')
     })
     
  };

  var otpSha256 = crypto.createHash('sha256').update(otp).digest('hex')
  return (
    <div>
      Enter you mobile{' '}
      <input value={mobile} onChange={(e) => setMobile(e.target.value)} />
      <button onClick={handleSubmit}> submit</button>
      {mobile} <br /> <br />
      <label> Enter OTP</label>{' '}
      <input type="number" onChange={(e) => setOTP(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>
     
    </div>
  );
}
