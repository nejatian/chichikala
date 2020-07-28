import React, { Component } from "react";
//import PayPalButton from "./PayPalButton";
import SubmitButton from "../../SubmitButton";
import InputField from "../../InputField";
import { Link } from "react-router-dom";
export default class CartTotals extends Component {
  constructor(props){
    super(props);
    this.state = {
        coupon:'',
        buttonDisabled:false,
        couponDis:0.0,
        cartTax:this.props.value,
        cartTotal:this.props.value,
      
    }
    this.doCoupon=this.doCoupon.bind(this)
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
async doCoupon(cartTotal,cartTax){
  try{
    let res = await fetch('http://127.0.0.1:8080/api/customer/check/coupon',{
      method: 'post',
      headers:{
        'accept':'application/json',
        'content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      },
      body: JSON.stringify({ 
        customerId:localStorage.getItem('UUID'),
        coupon: this.state.coupon

      })

    });
    let result = await res.json();
    console.log("result",result);
    let couponDis = result
    cartTax= couponDis;
    cartTotal= cartTotal *(1-cartTax);
    localStorage.removeItem('cartTax');
    localStorage.removeItem('cartTotal');
    localStorage.setItem('cartTax', couponDis);
    localStorage.setItem('cartTotal',cartTotal);
    this.forceUpdate();
    
  }
  catch(e){
    console.log(e);
  }

}
  async doSubmit(cartTotal){
    try{
      let res = await fetch('http://127.0.0.1:8080/api/transaction',{
      method: 'post',
      headers:{
        'accept':'application/json',
        'content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      },
      body: JSON.stringify({ 
        customerId: localStorage.getItem('UUID'),
        documentType: "sell",
        documentNumber: "not_matched",
        documentNumberRaw: "not_matched",
        purchaseDate: null,
        purchasePlace: "ChichiKala",
        customerData: null,
        items:[{
          sku:{
            code: "SKU1"
          },
          name:"Google Pixel - Black",
          quantity:1,
          grossValue:parseInt(cartTotal),
          category:"Mobile",
          labels: null,
          maker:"google",

        }],
        
      posId: null,
    	excludedDeliverySKUs: null,
    	excludedLevelSKUs: null,
    	excludedLevelCategories: null,
    	revisedDocument: null,
	    labels: [],
	    grossValue: parseInt(cartTotal)



      })

    });
    let result = await res.json();
    console.log("result",result);
    this.props.history.push("/");
   

    }
    catch(e){
        console.log(e);
               
    }
  }
  render() {
    let {
      cartSubTotal,
      cartTax,
      cartTotal,
      cart,
      clearCart
    } = this.props.value;
    
    const { history } = this.props;
    const emptyCart = cart.length === 0 ? true : false;
    let discount = localStorage.getItem('cartTax');
    if(discount){
      cartTax=discount * 100;
      cartTotal=cartTotal*(1-discount);
      localStorage.removeItem('cartTax');
    localStorage.removeItem('cartTotal');
    }



    return (
      <React.Fragment>
        {!emptyCart && (
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      clearCart();
                    }}
                  >
                    clear cart
                  </button>
                </Link>
                <InputField
                type='text'
                placeholder='coupon code'
                value={this.state.coupon ? this.state.coupon :''}
                onChange={(val)=>this.setInputValue('coupon',val)}
          />
          <SubmitButton
                    text='Submit'
                    disabled={this.state.buttonDisabled}
                    onClick={()=>this.doCoupon(cartTotal,cartTax)}
          />
                <h5>
                  <span className="text-title"> subtotal :</span>{" "}
                  <strong>$ {cartSubTotal} </strong>
                </h5>
                <h5>
                  <span className="text-title"> Discount :</span>{" "}
                  <strong>% {cartTax} </strong>
                </h5>
                <h5>
                  <span className="text-title"> total :</span>{" "}
                  <strong>$ {cartTotal} </strong>
                </h5>
                <SubmitButton
                    text='Submit'
                    disabled={this.state.buttonDisabled}
                    onClick={()=>this.doSubmit(cartTotal)}
          />
                {/* <PayPalButton
                  totalAmount={cartTotal}
                  clearCart={clearCart}
                  history={history}
                /> */}
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
