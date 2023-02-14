import React from "react";

function Button({ children, className = "", disabled = false }) {
    return (
       <button  
            className={`rounded-2xl bg-primaryAuthentication disabled:cursor-not-allowed text-primatyWhite mt-3 h-16 w-1/1 font-normal text-xl ${className}`} 
            disabled = { disabled } 
            type = "submit"
        >
            { children }
        </button>
    );
}

export default Button;
