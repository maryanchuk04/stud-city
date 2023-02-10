import React from "react";

function Button({ children, className, disabled }) {
    return (
       <button  
            className={`rounded-2xl bg-[#486645] disabled:cursor-not-allowed text-[#F9FCF8] mt-3 h-16 w-1/1 font-normal${className}`} 
            disabled = { disabled } 
            type="submit"
        >
            { children }
        </button>
    );
}

export default Button;
