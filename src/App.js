import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

export default function App() {
  const [mobile, setMobile] = useState('');
  const [txnId, setTxnId] = useState('');
  const [otp, setOTP] = useState('');

  const handleSubmit = () => {
    axios
      .post('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
        mobile: mobile,
      })
      .then((resp) => {
        const token = resp.data;
        localStorage.setItem('txnId', token.txnId);
        console.log(token.txnId);
      })
      .catch((err) => {
        console.log('Error');
      });
  };
  const handleVerify = () => {
    axios.post('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',{
      localStorage.getItem('txnId', txnId) 
      console.log()
    })
  };
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
