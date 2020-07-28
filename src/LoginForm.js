import React,{Component} from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "./store/UserStore";
import jwt_decode from "jwt-decode";
/* eslint-disable */
class LoginForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            buttonDisabled:false
            
        }
    }
    setInputValue(property, val){
        val= val.trim();
        if(val.lengh > 50){
            return;
        }
        this.setState({
            [property]: val 
        })     
    }
   
    async doLogin(){
        localStorage.clear();
        if(!this.state.username){
            return;
        }
        if(!this.state.password){
            return;
        }
        this.setState({
            buttonDisabled:true

        })
        try{
          let res = await fetch('http://127.0.0.1:8080/authenticate',{
          method: 'post',
          headers:{
            'accept':'application/json',
            'content-Type':'application/json'
          },
          body: JSON.stringify({ 
              username: this.state.username,
              password: this.state.password
          })

        });
        let result = await res.json();
        if(result){
            localStorage.clear();
            UserStore.isLoggedIn=true,
            UserStore.token=result.token;
            localStorage.setItem('token', result.token);
            localStorage.setItem('UUID',jwt_decode(result.token).id)
            console.log('tokenLogin',result.token);
            console.log('uuid',jwt_decode(result.token).id)
            this.props.history.push("/");
 

        }
        else if (result ===false){
            console.log("e");
        }

        }
        catch(e){
            console.log(e);
                   
        }
    }

  render() {
    return (
      <div className="loginForm">
          <InputField
                type='text'
                placeholder='Username'
                value={this.state.username ? this.state.username :''}
                onChange={(val)=>this.setInputValue('username',val)}
          />
          <InputField
                type='password'
                placeholder='password'
                value={this.state.password ? this.state.password :''}
                onChange={(val)=>this.setInputValue('password',val)}
          />
          <SubmitButton
                    text='Login'
                    disabled={this.state.buttonDisabled}
                    onClick={()=>this.doLogin()}
          />
      </div>
    );
  }
}

export default LoginForm;