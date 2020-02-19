import React, { Component } from 'react'


export default class Products extends Component {
        render(){
        const productItems=this.props.filteredProduct.map(fetchedData=>(
                <div className="product_card row" key={fetchedData.id}>
                     <img src={(fetchedData.img_url)} alt={fetchedData.name}></img>
                     <p>{fetchedData.name}</p>
                     <div className="card_price">
                        <span>
                        <b>₹{fetchedData.price-(fetchedData.price*fetchedData.discount/100)}</b>
                        </span>
                        <span>
                            <strike>{
                                fetchedData.price
                            }</strike>
                        </span>
                        <span style={{"color":"green"}}>
                            {fetchedData.discount}% off
                        </span>
                     </div>
                        <button className="btn btn-primary"
                        onClick={(e)=>this.props.handleAddToCart(e, fetchedData)}> <b>Add to Cart</b></button>
                </div>
)
        )
        return (
            <div className="row">
                {productItems}                
            </div>
        )
    }
}
