import React from "react"; 
import { findDOMNode } from "react-dom";
export default class ToolKit extends React.Component
{
	constructor(props)
  {
  	super(props); 
    this.state = {visible:false, x:0, y:0, type:"none"};
  } 
  pastShow(hoverRect)
  {
  	// find the hovering position the tooltip after showing it
  	var ttNode=findDOMNode(this); 
    
  	if(ttNode != null)
    {
      let x = 0, y = 0;
    	
      const docWidth = document.documentElement.clientWidth,
            docHeight = document.documentElement.clientHeight;
			
      let rx = hoverRect.x + hoverRect.width, // most right x of the rectangle
      		lx = hoverRect.x, // most left x for the rectangle
          ty = hoverRect.y, // most top y of the rectangle
          by = hoverRect.y + hoverRect.height; // most bottom y of the rectangle.
			
      // tool tip rectange height and width calculation 
      let ttRect = ttNode.getBoundingClientRect(); 
      let bRight = (rx + ttRect.width) <= (window.scrollX + docWidth);
      let bLeft = (lx - ttRect.width) >= 0; 
      let bAbove = (ty - ttRect.height) >= 0;
      let bBellow = (by + ttRect.height) <= (window.scrollY + docHeight); 
      let newState = {}; 
      // the tooltip doesn't fit to the right
      if(bRight)
      {
      	x = rx; 
        y = ty + (hoverRect.height - ttRect.height); 
      	if(y < 0)
        { 
            y = ty; 
        }
        
        newState.type = "right";
      }
      else if(bBellow)
      {
      	y = by; 
        x = lx + (hoverRect.width - ttRect.width); 
        if(x < 0)
        { 
            x = lx; 
        } 
        newState.type = "bottom";
      }
      else if(bLeft)
      {
      	x = lx - ttRect.width; 
        y = ty + (hoverRect.height - ttRect.height); 
        if(y < 0)
        { 
            y = ty; 
        } 
        newState.type = "left";
      }
      else if(bAbove)
      {
      	y = ty - ttRect.height; 
        x = lx + (hoverRect.width - ttRect.width); 
        if(x < 0)
        { 
            x = lx;
        } 
        newState.type = "top";
      } 
      newState = {...newState, x, y}; 
      this.setState(newState);
    }
  }
  show(hoverRect)
  {
  	let {pastShow} = this; 
    // setState will execute the pastShow with hoverRect as the tool tip becomes visible
  	this.setState({visible:true}, pastShow.bind(this, hoverRect))
	}
   hide() //hide the toolkit after removing the mouse pointer from the button.
  {
  	this.setState({visible:false})
  }
  render()
  {
    //show the tool tip of the button on hovering it
  	let {state} = this; 
    let visibility = state.visible === true ? "on" : "off"; 
    let style = {
      left: ((state.x + window.scrollX) + 'px'),
      top: ((state.y + window.scrollY) + 'px')
    }; 
    let classNames = {}; 
    if(state.type != null && state.type !== "none")
    {
    	classNames[state.type] = true;
    } 
    classNames[visibility] = true; 
    return <div id="tooltip" className={Object.keys(classNames).join(" ")} style={style}>
    <div className="tooltip-arrow"></div>
        <div className="tooltip-inner">
            Thanks for hovering! I'm a tooltip.
        </div>
    </div>;
  } 
}
