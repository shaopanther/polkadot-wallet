import React, { useState } from 'react';
import {
  createKeyMulti,
  encodeAddress,
  sortAddresses
} from '@polkadot/util-crypto';


function App() {
  const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex, extractTime } = require('@polkadot/util');

  const [multisig, setMultisig] = useState('');
  const [otheradd, setOtheradd] = useState('');
  const [error, setError] = useState('');

  let textInput = React.createRef();
function handleClick() {
  const addresses=[];
  setError('');
  setMultisig('');
  setOtheradd('');
  const test=textInput.current.value.split("\n");
  for(let i=0;i<test.length;i++)
	{
    const isValid = isValidAddressPolkadotAddress(test[i]);
    if(isValid){
      addresses.push(test[i]);
    }else{
      setError('Please Enter Valid Address..!');
      return false;
    }
	
	}
  if(test.length >20 || test.length < 3){
    setError('Please Enter Address in range of 3 to 20..!');
  }else{
      main(addresses);
  }

  
}
// verifying address

const isValidAddressPolkadotAddress = (address) => {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );

    return true;
  } catch (error) {
    return false;
  }
};


// 
  const SSsPrefix = 0;


  // The number of accounts that must approve. Must be greater than 0 and less than
  // or equal to the total number of addresses.
  const threshold = 2;
  
  // The address (as index in `addresses`) that will submit a transaction.
  const index = 0;
  
  function main (addresses) {
    // Address as a byte array.
    const multiAddress = createKeyMulti(addresses, threshold);
    // Convert byte array to SS58 encoding.
    const SsSAddress = encodeAddress(multiAddress, SSsPrefix);
    setMultisig(SsSAddress);
  
  
    // Take addresses and remove the sender.
    const otherSignatories = addresses.filter((who) => who !== addresses[index]);
  
    // Sort them by public key.
    const otherSignatoriesSorted = sortAddresses(otherSignatories, SSsPrefix);
  
  
    setOtheradd(otherSignatoriesSorted);
  
  }

// 1nUC7afqmo7zwRFWxDjrUQu9skk6fk99pafb4SiyGSRc8z3
// 1ZX2XntfLEHrBPy73DpfQp9rG7pbLyvrFjEpi7mNKQgyga5
// 14b1kB7CrqzRUeMsKc26FJ73f8FCpxAX6sNieu9gfYSfJuoL
  return (
    <div className="container text-center mt-5">
    <div className="row align-items-start">
       <div className='col-md-2'></div>
       <div className="col-md-8">
          <div className="mb-3">
          <h1>Polkadot Multisig Wallet</h1>
             <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3">Enter Public Address</label>
             <p className='text-danger'>One Address Per Line</p>
             <textarea className="form-control" ref={textInput} rows="3"></textarea>
             <button type="button" onClick={handleClick} className="btn btn-outline-primary btn-sm mt-3">Genrate Multisig</button>
             {multisig ?   <div className="card text-bg-primary mb-3 mt-2">
                <div className="card-header"><h4>Result</h4></div>
                <div className="card-body">
                  <h6 className="card-title">Multisignature Address : </h6>
                  <p className="card-text">{multisig}</p>
                  <hr/>
                  <h6 className="card-title">Other Addresses : </h6>
                  <p className="card-text">{otheradd}</p>
                </div>
              </div> : ''}
              { error ? <div className="alert alert-danger mt-2" role="alert">
                {error}
              </div> : '' }
           
          </div>
       </div>
       <div className='col-md-2'></div>
    </div>
 </div>
  );

}

export default App;
