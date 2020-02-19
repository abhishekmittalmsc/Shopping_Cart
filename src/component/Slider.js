import React from 'react';
import InputRange from 'react-input-range';
import './slider.css'

class Slider extends React.Component {
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

  render()
   {
  const{filtervalue}=this.props;
  const{filtervalue1}=this.props;
    const isDesktop=this.state.isDesktop
    return(
      <>
        {
          isDesktop?
          <div className="sliderMain">
          <div id="slider_title">
          <h2>Filters</h2>
          </div>
          <div id="slider_bar">
        <InputRange
          maxValue={1000}
          minValue={100}
          value={filtervalue1}
          step={100}
          onChange={(e)=> this.props.sliderFunction(e)}
          />
          
          </div>
          <button type="button" class="btn btn-primary" id="filtersubmit" onClick={(e)=>this.props.sliderButton(this.props.filtervalue1)}>Submit</button>
          </div>
          :<> <div class="filter_button"> 
              <button type="button" data-toggle="modal" data-target="#exampleModal">
              <h4><i class="fas fa-filter"> Filter</i></h4>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Filter Options</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <InputRange
        maxValue={1000}
        minValue={100}
        value={filtervalue1}
        step={100}
        onChange={(e)=> this.props.sliderFunction(e)}
        />
      </div>
      <div class="modal-footer">
        <button type="button" class=""data-dismiss="modal">Cancel</button>
        <button type="submit" class="" onClick={(e)=>this.props.sliderButton(this.props.filtervalue1)} >Apply</button>
      </div>
    </div>
  </div>
</div>

              </button></div>



            </>
        }
        






      </>
    )

    
  }
}

export default Slider;