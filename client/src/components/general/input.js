import React from 'react';

export default ({input, placeholder, meta}) => {
    return(
        <div>
            <input {...input} placeholder={placeholder}/>
            {meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
    )
}