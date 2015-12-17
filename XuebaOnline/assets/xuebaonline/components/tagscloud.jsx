import React from 'react';
import {TagCloud, DefaultRenderer} from "react-tagcloud";
import randomColor from "randomcolor";

export default class TagsCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      data:[
        {value:"c++", count:2500},{ value: "MongoDB", count: 18 },
        { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
        { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
        { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 },
        {value:"c++", count:2500},{ value: "MongoDB", count: 18 },
        { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
        { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
        { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 },
        {value:"c++", count:2500},{ value: "MongoDB", count: 18 },
        { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
        { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
        { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 }
      ],
      active: false
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.update = this.update.bind(this);

    // this.oDiv = null;
    // setInterval(this.update,30);
    // this.sineCosine( 0,0,0 );
    // this.positionAll();
  }

  handleMouseOver()
  {
    this.state.active=true;
  }
  handleMouseOut()
  {
    this.state.active=false;
  }
  handleMouseMove(ev)
  {
    if (this.oDiv != null) {
      mouseX=oEvent.clientX-(oDiv.offsetLeft+oDiv.offsetWidth/2);
      mouseY=oEvent.clientY-(oDiv.offsetTop+oDiv.offsetHeight/2);
      
      mouseX/=5;
      mouseY/=5;
    }
  }

  customRenderer(tag, size, key)
  {
    var defaultTagStyles = {
      margin: "0px 3px",
      verticalAlign: "middle",
      display: "inline-block"
    };

    var fontSize = size + "px";
    var color = randomColor();

    const elementProps = Object.assign({}, {key});
    elementProps.style = Object.assign({}, defaultTagStyles, {color}, {fontSize});
    return <a href={"/search/query?query_content="+tag.value} key={key} className={`tag-${size}`} {...elementProps}>{tag.value}</a>;
  };

  render() {
    return (
      <TagCloud tags={this.state.data} minSize={12} maxSize={35} ref={(c) => this.oDiv=c} renderer={this.customRenderer}/>
    );
  }
}

