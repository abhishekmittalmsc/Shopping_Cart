import React, { Component } from 'react';
import Products from './component/Products'
import Sort from './component/Sort'
import Cart from './component/Cart';
import Search from './component/Search'
import Slider from './component/Slider'
import "./component/Homepage.css"
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';







export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: [],
      filteredProduct: [],
      cartItems: [],
      searchField: "",
      displayProduct: {},
      priceSelectMin: 0,
      priceSelectMax: 0,
      homepage:true,
      filtervalue: { min: 100, max: 1000 },
      filtervalue1:{min:100, max:1000 },
      subtotal:0,
      newItem: []
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveCart = this.handleRemoveCart.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.sliderFunction = this.sliderFunction.bind(this);
    this.sortButton = this.sortButton.bind(this);
    this.sliderButton=this.sliderButton.bind(this);

  }



  componentDidMount() {
    fetch("https://api.myjson.com/bins/qzuzi")
      .then(res => res.json())
      .then(data => this.setState({
        product: data,
        product1: data,
        filteredProduct: data,
      }))
  }




  handleChangeSort(event) {
    this.setState({ sortSelect: event.target.value })
    this.listProducts();
  }

  sortButton(event, radiovalue, ) {
    this.setState({ sortSelect2: radiovalue })
    this.listProducts2();
  }


  listProducts() {
    this.setState(state => {
      if (state.sortSelect === 'discount') {
        state.product.sort((a, b) => (a.discount < b.discount) ? 1 : -1)
      } else if (state.sortSelect !== "") {
        state.product.sort((a, b) => (state.sortSelect === 'highest') ? (a.price > b.price ? 1 : -1) : (a.price < b.price ? 1 : -1))
      }
      else {
        state.product.sort((a, b) => (a.id < b.id ? 1 : -1))
      }
      return { filteredProduct: state.product }
    })
  }

  listProducts2() {
    this.setState(state => {
      if (state.sortSelect2 === 'discount') {
        state.product.sort((a, b) => (a.discount < b.discount) ? 1 : -1)
      } else if (state.sortSelect2 !== "") {
        state.product.sort((a, b) => (state.sortSelect2 === 'highest') ? (a.price > b.price ? 1 : -1) : (a.price < b.price ? 1 : -1))
      }
      else {
        state.product.sort((a, b) => (a.id < b.id ? 1 : -1))
      }
      return { filteredProduct: state.product }
    })
  }


  handleAddToCart(e, fetchedData) {

    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach(item => {
        if (item.id === fetchedData.id) {
          productAlreadyInCart = true;
          item.count++;
        }
      })
      if (!productAlreadyInCart) {
        cartItems.push({ ...fetchedData, count: 1 })
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      return cartItems;
    })
  }


  handleRemoveCart = (e, fetchedData) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== fetchedData.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  increaseCart = (e, fetchedData) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productIncreased = false;
      cartItems.forEach(item => {
        if (item.id === fetchedData.id) {
          productIncreased = true
          item.count++;

        }
      })

      if (!productIncreased) {
        cartItems.push({ ...fetchedData, count: 1 })
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      return cartItems;
    })
  }
  decreaseCart = (e, fetchedData) => {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productdecreased = false;
      cartItems.forEach(item => {
        if (item.id === fetchedData.id) {
          productdecreased = true
          if (item.count != 1) {
            item.count--;
          }

        }
      })
      if (!productdecreased) {
          cartItems.pop({ ...fetchedData, count: 1 })
        }
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      if (cartItems.length == 0) {
        this.handleRemoveCart()
      } return cartItems;

    })

  }




  searchChange(event) {
    this.setState({ searchField: event.target.value })
  }


  sliderFunction(e) {
    this.setState({filtervalue1:e })
  }

 sliderButton(e){
   this.setState({filtervalue:e})
 }
 


  cartClicked(){
    {
      this.state.cartItems.length>0?
      this.setState({homepage:false})
      :alert("Cart is Empty")
    }
    
  }

  homeClicked(){
    this.setState({homepage:true})
  }

  CartTotal=(props)=>{
    let abcprice=((this.state.cartItems.reduce((a,b)=>a + b.price*b.count, 0)))
    let abcdiscount=((this.state.cartItems.reduce((a,b)=>b.discount, 0)))
    let abcfinaldiscount=(abcprice)*(abcdiscount/100)
    let abcfinalamt=abcprice-abcfinaldiscount;
    
    
    return <div class="card border-success mb-3 w-3 m-3 p-3 d-flex">
      <div className="card-header bg-transparent border-success m-3 p-3"><h3>PRICE DETAILS</h3></div>
      <h4>
      <div className="card-body text-dark m-4 p-3"><span className="float-left">Price({this.state.cartItems.length} item) :</span>
      <span className="float-right">{abcprice}</span></div>

      <div className="card-body text-dark m-4 p-3"><span span className="float-left">Discount:</span>
      <span className="float-right" >{abcfinaldiscount}</span></div></h4>
      <h3>
      <div className="card-footer bg-transparent border-success m-3 p-3"><span span className="float-left">Total Payable</span>
      <span className="float-right">{abcfinalamt}</span></div>
      </h3>
       </div>
  }

  render() {
    const itemscount=this.state.cartItems.reduce((a,b)=>a+b.count,0)

    const displayProduct1 = this.state.product.filter((pro) => {
      const amt=(pro.price-((pro.price*pro.discount)/100))
      return amt > this.state.filtervalue.min && amt < this.state.filtervalue.max
    })

    const displayProduct2 = this.state.product.filter((pro) => {
      return pro.name.toLowerCase().includes(this.state.searchField.toLowerCase())
    })
    if (this.state.searchField != "") {
      this.state.displayProduct = displayProduct2

      if (this.state.filtervalue.min > 101) {
        this.state.displayProduct = displayProduct1
      }
    } else {
      this.state.displayProduct = displayProduct1
    };

    const StyledBadge = withStyles(theme => ({
      badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
      },
    }))(Badge);
    
    


    return (
      <div>
        {
       this.state.homepage?
       <div className="Homepage">
   <div className="d-flex p-2 bg-primary align-middle">
      <div className="d-inline-flex p-2 mr-auto p-2 align-middle text-warning"><i className="fas fa-star fa-3x fa-col-yellow" ></i></div>
       <div className="d-inline-flex p-2 align-middle"><Search searchChange={this.searchChange} /></div>                 
       <div className="d-inline-flex p-2 align-middle carticon align-content-md-center"></div>
       <IconButton aria-label="cart">
          <StyledBadge badgeContent={itemscount} color="secondary">
          <i class="fas fa-shopping-cart fa-2x" id="carticon" onClick={()=>this.cartClicked()}></i>
          </StyledBadge>
        </IconButton>
        
     </div>
     <Sort sortSelect={this.state.sortSelect} sortSelect2={this.state.sortSelect2} handleChangeSort={this.handleChangeSort} sortButton={this.sortButton}/>
     <div class="slider_bar">
     <Slider filtervalue={this.state.filtervalue} filtervalue1={this.state.filtervalue1}sliderFunction={this.sliderFunction}sliderButton={this.sliderButton}/>
     </div>
     <div class="main_product_div">
     <Products filteredProduct={this.state.displayProduct}handleAddToCart={this.handleAddToCart}
     />
     <footer>@copyright</footer>
     </div >
     
     </div>
     :<><div className="d-flex p-2 bg-primary align-middle">
      <div className="d-inline-flex p-2 mr-auto p-2 align-middle text-warning"><i className="fas fa-star fa-3x fa-col-yellow"onClick={()=>this.homeClicked()}></i></div>
       <div className="d-inline-flex p-2 align-middle"><Search searchChange={this.searchChange} /></div>                 
       <div className="d-inline-flex p-2 align-middle carticon align-content-md-center"></div>
              
       </div>
       <div class="row ">
       <div class="col-lg-8">
       <Cart cartItems={this.state.cartItems} handleRemoveCart={this.handleRemoveCart} increaseCart={this.increaseCart} decreaseCart={this.decreaseCart}/>
       </div>
       <div class="col-lg-4">
       <this.CartTotal></this.CartTotal>
         </div>
        </div>
        
        <footer >@copyright</footer>
        
        </>
                 
        }
        </div>
    )}}
    
     
    
    