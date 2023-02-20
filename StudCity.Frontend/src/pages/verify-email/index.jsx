import React, { useState }  from 'react';
import TextField from '../../UI/fields/TextField';
import { numberValidation } from '../../utils/validators/validators';
import Svg from '../../components/Svg';

function VerifyEmail() {
    const [verifyNumbersArray, setVerifyNumbersArray] = useState(["", "", "", "", "", ""]);

    const handleChangeNumber = (e, index) => {
        verifyNumbersArray[index] = numberValidation(e.target.value);
        setVerifyNumbersArray([...verifyNumbersArray]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyNumbersArray.join("");
    };

  return (
    <div className='w-full h-screen flex relative text-center'>
        <div className='w-6/12 h-screen relative bg-white'>
            <Svg type='verifyWave' className='rotate-[270deg] w-full absolute -left-[45%] top-[39%]'/>
        </div>
        <div className='w-6/12 h-screen bg-[#453e35]'></div>
        <div className='w-[70%] shadow-md h-5/6 bg-white z-10 mx-auto my-0 absolute left-[15%] top-[8%] text-center'>
            <Svg type = 'verifyEmail' className='w-[23%] mx-auto my-8' />
            <h1 className='text-4xl font-medium my-6'>Please Verify Account</h1>
            <p className='text-stone-400 my-6'>Enter the six digit code we sent to your email address to verify your new account:</p>
            <form onSubmit = {handleSubmit}>
                <div className='mx-auto w-[40%] my-0 flex justify-around items-center'>
                    {
                        verifyNumbersArray.map((item, index) => (
                            <TextField
                                tabIndex = {index}
                                key = {index}
                                maxLength = "1"
                                required = {true}
                                onChange = {(e) => handleChangeNumber(e, index)}
                                value = {item}
                                type = "text"
                                className='w-14 rounded-none hover:border-stone-500 focus:border-stone-600 focus:outline-none text-4xl text-center h-24 bg-white' 
                            />
                        ))
                    }
                </div>
                <button className='my-10 py-3 px-12 bg-[#453e35] hover:bg-stone-500 duration-300 font-medium text-white'>Verify & Continue</button>
            </form>
        </div>
    </div>
  )
}

export default VerifyEmail