import React from 'react';
import s from './FormsControls.module.css'

export const TextArea = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error
    return (
        <div className={`${s.form_control} ${hasError ? s.error : ''}`}>
            <div><textarea {...input}{...props}/></div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};
export const Input = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error
    return (
        <div className={`${s.form_control} ${hasError ? s.error : ''}`}>
            <div><input {...input}{...props}/></div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
};

export default TextArea;