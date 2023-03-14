import React, { useState } from 'react';


function ContactUs() {
    const classInput = "border-b-2 w-80 my-2 py-4 hover:border-b-zinc-400 focus:outline-none focus:border-b-black"
    const [details, setDetails] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(details);
    }

  return (
    <div className="flex w-full h-screen">
        <div className='w-2/5 relative'>
            <img className='h-screen z-0' src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnRhY3QlMjB1c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
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
                        name="name" 
                        placeholder='Enter your first name'
                        onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
                        />
                </div>
                <div className='my-2'>
                    <h3 className='uppercase font-medium'>Last Name</h3>
                    <input 
                        className={classInput}
                        name="name" 
                        placeholder='Enter your last name' 
                        onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
                        />
                </div>
                <div className='my-2'>
                    <h3 className='uppercase font-medium'>Email</h3>
                    <input 
                        className={classInput}
                        name="email" 
                        placeholder='Enter your email' 
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        />
                </div>
                <div className='my-2'>
                    <h3 className='uppercase font-medium'>Phone number</h3>
                    <input 
                        className={classInput}
                        name="number" 
                        placeholder='Enter your phone number' 
                        onChange={(e) => setDetails({ ...details, phoneNumber: e.target.value })}
                        />
                </div>
                <div className='col-span-2 my-2'>
                    <h3 className='uppercase font-medium'>Message</h3>
                    <textarea 
                        className='border-b-2 w-[86%] my-2 py-3 hover:border-b-zinc-400 focus:outline-none focus:border-b-black' 
                        name="text" 
                        placeholder='Enter your message' 
                        onChange={(e) => setDetails({ ...details, message: e.target.value })}
                        />
                </div>
            </div>
            <button className='font-medium text-lg'>Submit<i className="text-base font-medium px-2 fa-light fa-arrow-right"></i></button>
        </form>
    </div>
  )
}

export default ContactUs