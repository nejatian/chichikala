import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";

export default class Product extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      discountVal: 0.0,
      price : 0,
      data:{}

        }
}
componentDidMount() {
  const token =localStorage.getItem('token');
  if (token){
    const uuid =localStorage.getItem('UUID');
    //make your api call here and and set the value in state
     fetch('http://127.0.0.1:8080/api/admin/customer/level/'+uuid,{
        method: 'get',
        headers:{
          'accept':'application/json',
          'content-Type':'application/json',
          'Authorization':'Bearer '+localStorage.getItem('token')
        }
       
  
      }).then(response => response.json()).then(data => {console.log(data)
        this.setState({ data: data })
      });
     
  
  }
  

}

  // async doGetLevel(uuid){
  //   try{
  //     let res = await fetch('http://127.0.0.1:8080/api/admin/customer/level/'+uuid,{
  //     method: 'get',
  //     headers:{
  //       'accept':'application/json',
  //       'content-Type':'application/json',
  //       'Authorization':'Bearer '+localStorage.getItem('token')
  //     }
     

  //   });
  //   let result = await res.json();
  //   let discountVal= 0.0;
  //   console.log('res',result);
  //   discountVal=result.rewardValue;
  //   this.setState({discountVal:discountVal})
  //   console.log('discountVal',discountVal);
  //   // localStorage.removeItem('discountVal');
  //   // localStorage.setItem('discountVal',discountVal);
  //   // console.log('localval',localStorage.getItem('discountVal'));

  // }
  // catch(e){
  //   console.log(e);
  // }


  // }
 
  render() {
    let { id, title, img, price, inCart } = this.props.product;
    console.log('this.props.product',this.props.product)
    const token =localStorage.getItem('token');
  if (token){
    const {data}= this.state;
    let discount= data.rewardValue;
    console.log(discount);
    let newPrice= 0.0;
    newPrice = (price * (1-discount)).toFixed(1);
    price=newPrice;
  }
    // const token =localStorage.getItem('token');
    // console.log('tokeninItem',token);

   
    // if(token){
    //   let newPrice= 0.0;
    //   let discount= this.state.discountVal;
    //   const uuid =localStorage.getItem('UUID');
    //   console.log('uuid in producttttt',uuid);
    //   this.doGetLevel(uuid);
    //   newPrice = (price * (1-discount)).toFixed(1);
    //   console.log('newPrice',newPrice);
    //   price=newPrice;
    
    // }
    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <ProductConsumer>
            {value => {
              return (
                <div
                  className="img-container p-5"
                  onClick={() => value.handleDetail(id)}
                >
                  <Link to="/details">
                    <img src={img} alt="" className="card-img-top" />
                  </Link>
                  <button
                    className="cart-btn"
                    disabled={inCart ? true : false}
                    onClick={() => {
                      value.addToCart(id);
                      value.openModal(id);
                    }}
                  >
                    {inCart ? (
                      <p className="text-capitalize mb-0" disabled>
                        in cart
                      </p>
                    ) : (
                      <i className="fas fa-cart-plus" />
                    )}
                  </button>
                </div>
              );
            }}
          </ProductConsumer>
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-blue font-italic mb-0">
              <span className="mr-1">$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

const ProductWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
  .card-footer {
    background: transparent;
    border-top: transparent;
    transition: all 1s linear;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(247, 247, 247);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img-top {
    transition: all 1s linear;
  }
  .img-container:hover .card-img-top {
    transform: scale(1.2);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 1s ease-in-out;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
