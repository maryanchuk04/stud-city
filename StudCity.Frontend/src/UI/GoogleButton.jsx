import React from "react";
import Svg from '../components/Svg';

function GoogleButton({ className = "" }) {
    return (
		<button type='button' className={`flex break-inside bg-white text-primaryAuthentication border-2 border-primaryAuthentication rounded-3xl w-full mx-auto mb-4 w-full h-12 ${className}`}>
			<div className='m-auto'>
				<div className='flex items-center justify-start flex-1 space-x-4 text-xl'>
					<Svg type="googleAuthorized" />
					<span className='font-medium mb-[-2px] '>Continue with Google</span>
				</div>
			</div>
		</button>
    );
}

export default GoogleButton;
