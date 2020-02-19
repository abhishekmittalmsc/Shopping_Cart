import React, { Component } from 'react'

export default class Sort extends Component {
    constructor(props){
        super(props)
        this.state={
            radiovalue:"",
            isDesktop:window.innerWidth>800,
        };
        this.updatePredicate = this.updatePredicate.bind(this);
      }
      componentDidMount() {
        this.updatePredicate();
        window.addEventListener("resize", this.updatePredicate);
      }
    
      componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
      }
    
      updatePredicate() {
        this.setState({ isDesktop: window.innerWidth > 800 });
      }    
    
    render() {
      const isDesktop=this.state.isDesktop
       return(
        
       <div>
         {
           isDesktop?
               <div className="sort_component">
                  {console.log(isDesktop)}
                <b><label className="btn"><h3>Sort by</h3>   </label>
                <button className="btn btn-link btn-lg" value="lowest" onClick={this.props.handleChangeSort}> Price -- High Low     </button>
                <button className="btn btn-link btn-lg" value="highest" onClick={this.props.handleChangeSort}>Price -- Low High</button>
                <button className="btn btn-link btn-lg" value="discount" onClick={this.props.handleChangeSort}>Discount  </button>
            </b>
            </div>
           :<div>
            <div class="modal_button">
            <button type="button" data-toggle="modal" data-target="#myModal">
            <h4><i class="fas fa-sort"> Sort</i></h4>
        </button></div>
      
      <div class="modal" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
            
              <div class="modal-header">
                <h4 class="modal-title">Sort Option
              </h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
      
              <div class="modal-bodysort">
                  <form>
                  <input type="radio" name="radio" value="lowest" onChange={(e)=>this.setState({radiovalue:"lowest"})}/>Price -- High Low<br/>
                  <input type="radio"  name="radio" value="highest" onChange={(e)=>this.setState({radiovalue:"highest"})}/>Price -- Low High<br/>
                  <input type="radio"  name="radio" value="discount" onChange={(e)=>this.setState({radiovalue:"discount"})}/>discount<br/>
                  </form>
               </div>   <hr/>
                  <div class="modal-footersort">
              <button class="btn btn-primary" onClick={(event)=>{this.props.sortButton(event,this.state.radiovalue)}} data-dismiss="modal">Apply</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        </div>

            }
          
        </div>

      )
  }
}










