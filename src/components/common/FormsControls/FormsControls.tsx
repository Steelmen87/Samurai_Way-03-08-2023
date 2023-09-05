import React from 'react';
import s from './FormsControls.module.css'

export const TextArea: React.FC<any> = ({input, meta: {touched, error}, ...props}) => {
    let hasError = touched && error
    return (
        <div className={`${s.form_control} ${hasError ? s.error : ''}`}>
            <div>
                <textarea {...input}{...props}/></div>
            {hasError && <span>{error}</span>}
        </div>
    );
};
export const Input: React.FC<any> = ({input, meta: {touched, error}, ...props}) => {
    let hasError = touched && error
    return (
        <div className={`${s.form_control} ${hasError ? s.error : ''}`}>
            <div><input {...input}{...props}/></div>
            {hasError && <span>{error}</span>}
        </div>
    );
};

export default TextArea;