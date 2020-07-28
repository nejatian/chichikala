import React, { Component } from "react";
import "./App.css";
import UserStore from "./store/UserStore";
import LoginForm from "./LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import Logout from "./LogOut"

class App extends Component {

  componentDidMount(){
    let token = localStorage.getItem('token');
    console.log('token',token)
  }
  async doLogout(){
    try{
        let res = await fetch('http://127.0.0.1:8080/logout',{
          method: 'post',
          headers:{
            'accept':'application/json',
            'content-Type':'application/json'
          }
        });
        let result = await res.json();

        if(result && result.success){
         
          UserStore.isLoggedIn = false;
          UserStore.username = '';
        }
       
    }
    catch(e){
      console.log(e);
    }
  }
  render() {
  
    
    
        
          return(
            <React.Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route path="/LoginForm" component={LoginForm}/>
              <Route path="/LogOut" component={Logout}/>
              <Route path="/details" component={Details} />
              <Route path="/cart" component={Cart} />
              <Route component={Default} />
            </Switch>
            <Modal />
          </React.Fragment>
           )
        
        
        
    // else{
    //   console.log('UserStore.isLoggedIn2',UserStore.isLoggedIn);
    //   return(
    //     <div className="app">
    //       <div>
    //         <LoginForm/>
    //       </div>

    //     </div>
    // )
    // }
    
      
    // return (
    //   <React.Fragment>
    //     <Navbar />
    //     <Switch>
    //       <Route exact path="/" component={ProductList} />
    //       <Route path="/details" component={Details} />
    //       <Route path="/cart" component={Cart} />
    //       <Route component={Default} />
    //     </Switch>
    //     <Modal />
    //   </React.Fragment>
    // );
  }
}

export default App;
