import React, { Children } from "react";


const Button = ({Children, className = "", ...props}) => {

    return(
        <button
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
            {...props}>
                {Children}
        </button>
    );

}

export default Button;