import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
export default class Modal extends Component {
  state = {
   
    data:{}
  };
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
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { modalOpen, closeModal } = value;
          let { img, title, price } = value.modalProduct;
          const token =localStorage.getItem('token');
          if (token){
            const {data}= this.state;
            let discount= data.rewardValue;
            console.log(discount);
            let newPrice= 0.0;
            newPrice = (price * (1-discount)).toFixed(1);
            price=newPrice;
            console.log('in Modal',price)
          }
          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      className="col-8 mx-auto col-md-6 col-lg-4 p-5 text-center text-capitalize"
                      id="modal"
                    >
                      <h5>item added to cart</h5>
                      <img src={img} className="img-fluid" alt="" />
                      <h5>{title}</h5>
                      <h5 className="text-muted">price : ${price}</h5>
                      <Link to="/">
                        <ButtonContainer
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          Continue Shopping
                        </ButtonContainer>
                      </Link>
                      <Link to="/cart">
                        <ButtonContainer
                          cart
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          Go To Cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
