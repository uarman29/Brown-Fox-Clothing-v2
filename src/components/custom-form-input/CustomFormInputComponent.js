import React from 'react';
import './CustomFormInputComponent.css';

const CustomFormInputComponent = ({label, ...otherProps}) =>
{
    return(
        <div className="custom-form-group">
            <label className="custom-form-label">{label}</label>
            <input className="custom-form-input" {...otherProps}/>
        </div>
    );
}

export default CustomFormInputComponent;