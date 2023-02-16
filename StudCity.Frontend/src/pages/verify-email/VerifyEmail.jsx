import React, { useState }  from 'react';
import TextField from '../../UI/fields/TextField';
import { numberValidation } from '../../utils/validators/validators';
import Svg from '../../components/Svg';

function VerifyEmail() {
    const [numbers, setNumbers] = useState({
        number1: "",
        number2: "",
        number3: "",
        number4: "",
        number5: "",
        number6: "",
    });

    const handleChangeNumber = (e, fieldName) => {
        setNumbers({ ...numbers, [fieldName]: numberValidation(e.target.value) })
    }

  return (
    <div className='w-full h-screen flex relative text-center'>
        <div className='w-6/12 h-screen relative bg-white'>
            <Svg type='verifyWave' className='rotate-[270deg]  absolute left-[-45%] top-[44%]'/>
        </div>
        <div className='w-6/12 h-screen bg-[#453e35]'></div>
        <div className='w-[70%] shadow-md h-[85%] bg-white z-10 mx-auto my-0 absolute left-[15%] top-[8%] text-center'>
            <Svg type='verifyEmail' className='w-[23%] mx-auto my-8' />
            <h1 className='text-4xl font-medium my-6'>Please Verify Account</h1>
            <p className='text-stone-400 my-6'>Enter the six digit code we sent to your email address to verify your new account:</p>
            <form  action="">
                <div className='mx-auto w-[40%] my-0 flex justify-around items-center'>
                <TextField
                        maxLength = "1"
                        handleChange = {(e) => handleChangeNumber(e, "number1")}
                        value = {numbers.number1}
                        type = "text"
                        className='w-14 rounded-none hover:border-stone-500 focus:border-stone-600 focus:outline-none text-4xl text-center h-24  bg-white' 
                    />
                    <TextField
                        maxLength = "1"
                        handleChange = {(e) => handleChangeNumber(e, "number2")}
                        value = {numbers.number2}
                        type = "text"
                        className='w-14 rounded-none hover:border-stone-500 focus:border-stone-600 focus:outline-none text-4xl text-center h-24  bg-white' 
                    />
                    <TextField
                        maxLength = "1"
                        handleChange = {(e) => handleChangeNumber(e, "number3")}
                        value = {numbers.number3}
                        type = "text"
                        className='w-14 rounded-none hover:border-stone-500 focus:border-stone-600 focus:outline-none text-4xl text-center h-24  bg-white' 
                    />
                    <TextField
                        maxLength = "1"
                        handleChange = {(e) => handleChangeNumber(e, "number4")}
                        value = {numbers.number4}
                        type = "text"
                        className='w-14 rounded-none hover:border-stone-500 focus:border-stone-600 focus:outline-none text-4xl text-center h-24  bg-white' 
                    />
                    <TextField
                        maxLength = "1"
                        handleChange = {(e) => handleChangeNumber(e, "number5")}
                        value = {numbers.number5}
                        type = "text"
                        className='w-14 rounded-none hover:border-stone-500 focus:border-stone-600 focus:outline-none text-4xl text-center h-24  bg-white' 
                    />
                    <TextField
                        maxLength = "1"
                        handleChange = {(e) => handleChangeNumber(e, "number6")}
                        value = {numbers.number6}
                        type = "text"
                        className='w-14 rounded-none hover:border-stone-500 focus:border-stone-600 focus:outline-none text-4xl text-center h-24  bg-white' 
                    />
                </div>
                <button className='my-10 py-3 px-12 bg-[#453e35] hover:bg-stone-500 duration-300 font-medium text-white'>Verify & Continue</button>
            </form>
        </div>
    </div>
  )
}

export default VerifyEmail