import React from "react";

function Button({ children, className = "", disabled = false }) {
    return (
       <button  
            className={`rounded-3xl bg-primaryAuthentication disabled:cursor-not-allowed text-primatyWhite  mx-auto mt-3 h-12  font-normal text-xl w-full ${className}`} 
            disabled = { disabled } 
            type = "submit"
        >
            { children }
        </button>
    );
}

export default Button;
