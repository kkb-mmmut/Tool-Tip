import React from "react";
import ToolKit from './ToolKit'
import Button from './Button';
//Importing the imp files from the components file.
class App extends React.Component
{
  //constructor to intiate the props with the inital value.
	constructor(props)
  {
  	super(props); 
    this.setupRefs(); 
    this.setupEvents();
  }
  setupRefs()
  {
  	this.toolTip = React.createRef(); //Refs provide a way to access DOM nodes or React elements created in the render method
  }
  setupEvents() //all the necessary handlers are included in this.
  {
  	this.createBtn = this.createBtn.bind(this);
  	this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
  }
  handleOnMouseOut(evt) //on mouse out the tool top hide by its own.
  {
  	this.toolTip.current.hide();
  }
  handleOnMouseOver(evt)
  {
  	// get hovered element reference the event fired and show the tooltip according to the position to the button.
  	let el = evt.currentTarget; 
    if(el != null)
    {
    	let rect = el.getBoundingClientRect(); //get the position of the dom element.
      console.log(rect);
      this.toolTip.current.show(rect);
		}
  }
  createBtn(id, text)
  {
  	var {handleOnMouseOver, handleOnMouseOut} = this; 
  	return <Button id={id} onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}>{text}</Button>
	}
  render()
  { 
    return <div>
      {this.createBtn("btnLeft", "Hover Me!")}
      {this.createBtn("btnRight", "Hover Me!")}
      {this.createBtn("btnBtmR", "Hover Me!")}
      {this.createBtn("btnCenter", "Hover Me!")}
      <ToolKit ref={this.toolTip} />
    </div>;
	} 
}
export default App;