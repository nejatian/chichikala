import React,{Component} from "react";
import SubmitButton from "./SubmitButton";

/* eslint-disable */
class Logout extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            buttonDisabled:false
            
        }
    }
  
    async doLogout(){
        localStorage.clear();
        console.log('tokenLogout',localStorage.getItem('token'));
        this.props.history.push("/");
    }

  render() {
    return (
      <div className="logOut">
       
          <SubmitButton
                    text='Logout'
                    disabled={this.state.buttonDisabled}
                    onClick={()=>this.doLogout()}
          />
      </div>
    );
  }
}

export default Logout;