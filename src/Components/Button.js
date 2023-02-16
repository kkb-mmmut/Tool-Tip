import React from "react";
//create a button on event fired 
export default class Button extends React.Component
{
	events = {}
	constructor(props)
  {
	  super(props);
    
    this.state = {
    	id:props.id,
      text:props.children
    };
    
    this.events.onMouseOver = props.onMouseOver;//this event fired when the mouse hover.
    this.events.onMouseOut = props.onMouseOut;//this event is fired on mouse out.
  }
  render()
  {
  	return <button type="button" id={this.state.id} onMouseOver={this.events.onMouseOver} onMouseLeave={this.events.onMouseOut}>{this.state.text}</button>
  }
}
