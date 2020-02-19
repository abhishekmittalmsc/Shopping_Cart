import React, { Component } from 'react'



export default class Cart extends Component {
    constructor(props){
    super(props)
        this.state={
            newcartData:""
        }

}



    render(props) {
           
            const cartData=this.props.cartItems.map(item=>{
           
                return (<div id="cartcard" className="row align-items-center m-3">
                        <div class="col-lg-3 cartimg mb-3">
                        <img src={(item.img_url)} alt="cart image"/>
                        </div>
                            <div className="row align-items-center cartitemgroup">
                        <div className="cartprice col-lg-4">
                            <span><b>{item.name}</b></span> <br/><br/>
                            <span><b>₹{item.price-(item.price*item.discount/100)}</b></span>
                            <span><strike>{item.price}</strike></span>
                            <span style={{"color":"green"}}><b>{item.discount}% off</b></span>
                        </div>

                        <div class=" cartbtn col-lg-4">
                            <button className="btn btn-primary btn-lg"onClick={(e)=>this.props.increaseCart(e, item)}> <b>+</b></button>
                            <label ><b>{item.count}</b></label>
                            <button className="btn btn-primary btn-lg"onClick={(e)=>this.props.decreaseCart(e, item)}> <b>-</b></button>
                        </div>

                        <div class=" cartrmv col-lg-4 ">
                            <button className="btn btn-danger btn-lg" onClick={(e)=>this.props.handleRemoveCart(e,item)}>Remove</button>
                            </div>
                            
                        </div>
                </div>
                
                )}
            
            )
            return(<>
                    {cartData}
                    </>
            )
                   
                   
}}                         
                            
                            
                        
                            
                        
                        
                     


