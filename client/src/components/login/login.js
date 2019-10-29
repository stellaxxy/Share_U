import React, {Component} from 'react';
import LoginForm from './login_form';
import {connect} from 'react-redux';
import {setLoginInfo} from "../../actions";
import axios from 'axios';

class Login extends Component {
     handleSubmit = async (values)=>{
        let loginValues = {password: values.password};

        if(values.loginInfo.includes("@")){
            loginValues.email = values.loginInfo;
        } else {
            loginValues.username = values.loginInfo;
        }

        const result = await axios.post('/api/login', loginValues);

        if(result.data.success){
            this.props.history.push('/');
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