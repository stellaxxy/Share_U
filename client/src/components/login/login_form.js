import React from 'react';
import {Form, Field} from 'react-final-form';
import {FORM_ERROR} from "final-form";
import Input from '../general/input';

export default (props) => {
    const {onSubmit} = props;

    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Field name="loginInfo" component={Input} placeholder="username or email" type="text"></Field>
                    <Field name="password" type="password" component={Input} placeholder="password"></Field>
                    <div>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            )}
        />
    )
}

function validate(values){
    const errors = {};

    if(!values.loginInfo){
        errors.loginInfo = 'Required Field';
    }
    if(!values.password){
        errors.password = 'Required Field';
    }
    return errors;
}