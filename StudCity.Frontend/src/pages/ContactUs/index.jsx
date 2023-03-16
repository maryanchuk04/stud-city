import React, { useState } from 'react';

function ContactUs() {
    const classInput = "border-b-2 w-80 my-2 py-4 hover:border-b-zinc-400 focus:outline-none focus:border-b-black"
    const [userData, setUserData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="flex w-full h-screen">
            <div className='w-2/5 relative'>
                <img className='h-screen z-0' src="/images/contact-us.jpg" alt="" />
                <div className='flex z-10 absolute bottom-4 left-[20%]'>
                    <a href=""><i className="fa-light fa-envelope text-2xl p-5"></i></a>
                    <a href=""><i className="fa-brands fa-instagram text-2xl p-5"></i></a>
                    <a href=""><i className="fa-brands fa-facebook-f text-2xl p-5"></i></a>
                    <a href=""><i className="fa-brands fa-twitter text-2xl p-5"></i></a>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='w-3/5 h-auto my-24 mx-auto'>
                <h1 className='text-5xl font-sans'>Contact Us</h1>
                <div className='grid grid-cols-2 gap-3 my-7 '>
                    <div className='my-2'>
                        <h3 className='uppercase font-medium'>Fist name</h3>
                        <input 
                            className={classInput} 
                            name="firstName" 
                            placeholder='Enter your first name'
                            onChange={handleChange}
                            />
                    </div>
                    <div className='my-2'>
                        <h3 className='uppercase font-medium'>Last Name</h3>
                        <input 
                            className={classInput}
                            name="lastName" 
                            placeholder='Enter your last name' 
                            onChange={handleChange}
                            />
                    </div>
                    <div className='my-2'>
                        <h3 className='uppercase font-medium'>Email</h3>
                        <input 
                            className={classInput}
                            name="email" 
                            placeholder='Enter your email' 
                            onChange={handleChange}
                            />
                    </div>
                    <div className='my-2'>
                        <h3 className='uppercase font-medium'>Phone number</h3>
                        <input 
                            className={classInput}
                            name="phoneNumber" 
                            placeholder='Enter your phone number' 
                            onChange={handleChange}
                            />
                    </div>
                    <div className='col-span-2 my-2'>
                        <h3 className='uppercase font-medium'>Message</h3>
                        <textarea 
                            className='border-b-2 w-[86%] my-2 py-3 hover:border-b-zinc-400 focus:outline-none focus:border-b-black' 
                            name="message" 
                            placeholder='Enter your message' 
                            onChange={handleChange}
                            />
                    </div>
                </div>
                <button className='font-medium text-lg'>Submit<i className="text-base font-medium px-2 fa-light fa-arrow-right"></i></button>
            </form>
        </div>
    )
}

export default ContactUs