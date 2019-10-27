import React, {Component} from 'react';
import LoginForm from './login_form';
import {connect} from 'react-redux';
import {setLoginInfo} from "../../actions";
import axios from 'axios';

class Login extends Component {
    async handleSubmit(values){
        let loginValues = {password: values.password};

        if(values.loginInfo.includes("@")){
            loginValues.email = values.loginInfo;
        } else {
            loginValues.username = values.loginInfo;
        }

        const result = await axios.post('/api/login', loginValues);
        console.log('result', result);
        if(result.success){
            //let loginPayload = {auth: true, info: {}};
            //this.props.setLoginInfo()

        }
    }

    render() {
        return (
            <LoginForm onSubmit={this.handleSubmit}/>
        )
    }
}

const mapDispatchToProps = {
    setLoginInfo
};

export default connect(null, mapDispatchToProps)(Login);