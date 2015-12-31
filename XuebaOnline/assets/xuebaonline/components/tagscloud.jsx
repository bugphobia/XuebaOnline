import React from 'react';
import {TagCloud, DefaultRenderer} from "react-tagcloud";
import randomColor from "randomcolor";

export default class TagsCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      data:[
        'c++','java','haskell','test','test1','test2','test3','test4'
      ],
      active: false,
      sa:0,
      ca:0,
      sb:0,
      cb:0,
      sc:0,
      cc:0,
      radius:160
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.sineCosine = this.sineCosine.bind(this);
    this.doPosition = this.doPosition.bind(this);
    this.positionAll = this.positionAll.bind(this);
    this.depthSort = this.depthSort.bind(this);
    this.update = this.update.bind(this);

    this.mcList = [];
    this.distr = Math.PI/180;
    this.mouseX=0;
    this.mouseY=0;
    this.lasta = 1;
    this.lastb = 1;
    this.aA = [];
    // setInterval(this.update,30);
    // this.sineCosine( 0,0,0 );
    // this.positionAll();
  }

  update()
  {
    var a;
    var b;
    var tspeed=1;
    var size=250;
    var howElliptical=1;
    var d = 300;
    
    if(this.state.active)
    {
      a = (-Math.min( Math.max( -this.mouseY, -size ), size ) / this.state.radius ) * tspeed;
      b = (Math.min( Math.max( -this.mouseX, -size ), size ) / this.state.radius ) * tspeed;
    }
    else
    {
      a = this.lasta * 0.98;
      b = this.lastb * 0.98;
    }
    
    this.lasta=a;
    this.lastb=b;
    
    if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
    {
      return;
    }
    
    var c=0;
    this.sineCosine(a,b,c);
    for(var j=0;j < this.mcList.length;j++)
    {
      var rx1=this.mcList[j].cx;
      var ry1=this.mcList[j].cy*this.state.ca+this.mcList[j].cz*(-this.state.sa);
      var rz1=this.mcList[j].cy*this.state.sa+this.mcList[j].cz*this.state.ca;
      
      var rx2=rx1*this.state.cb+rz1*this.state.sb;
      var ry2=ry1;
      var rz2=rx1*(-this.state.sb)+rz1*this.state.cb;
      
      var rx3=rx2*this.state.cc+ry2*(-this.state.sc);
      var ry3=rx2*this.state.sc+ry2*this.state.cc;
      var rz3=rz2;
      
      this.mcList[j].cx=rx3;
      this.mcList[j].cy=ry3;
      this.mcList[j].cz=rz3;
      
      var per=d/(d+rz3);
      
      this.mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
      this.mcList[j].y=ry3*per;
      this.mcList[j].scale=per;
      this.mcList[j].alpha=per;
      
      this.mcList[j].alpha=(this.mcList[j].alpha-0.6)*(10/6);
    }
    
    this.doPosition();
    this.depthSort();
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
    if (this.refs.oDiv != null) {
      var oEvent=window.event || ev;
      this.mouseX=oEvent.clientX-(this.refs.oDiv.offsetLeft+this.refs.oDiv.offsetWidth/2);
      this.mouseY=oEvent.clientY-(this.refs.oDiv.offsetTop+this.refs.oDiv.offsetHeight/2);
      
      this.mouseX/=5;
      this.mouseY/=5;
    }
  }
  sineCosine( a, b, c)
  {
    this.state.sa = Math.sin(a * this.state.dtr);
    this.state.ca = Math.cos(a * this.state.dtr);
    this.state.sb = Math.sin(b * this.state.dtr);
    this.state.cb = Math.cos(b * this.state.dtr);
    this.state.sc = Math.sin(c * this.state.dtr);
    this.state.cc = Math.cos(c * this.state.dtr);
  }
  doPosition()
  {
    if (this.refs.oDiv == null) return ;
    var l=this.refs.oDiv.offsetWidth/2;
    var t=this.refs.oDiv.offsetHeight/2;
    for(var i=0;i < this.mcList.length; i++)
    {
      this.aA[i].style.left=this.mcList[i].cx+l-this.mcList[i].offsetWidth/2+'px';
      this.aA[i].style.top=this.mcList[i].cy+t-this.mcList[i].offsetHeight/2+'px';
      
      this.aA[i].style.fontSize=Math.ceil(12*this.mcList[i].scale/2)+8+'px';
      
      this.aA[i].style.filter="alpha(opacity="+100*this.mcList[i].alpha+")";
      this.aA[i].style.opacity=this.mcList[i].alpha;
    }
  }

  positionAll()
  {
    if (this.refs.oDiv == null) return;
    var phi=0;
    var theta=0;
    var max=this.mcList.length;
    var i=0;
    
    var aTmp=[];
    
    for(i=0;i < this.aA.length;i++)
    {
      aTmp.push(this.aA[i]);
    }
    
    aTmp.sort
    (
      function ()
      {
        return Math.random()<0.5?1:-1;
      }
    );
    
    for( var i=1; i < max+1; i++){
      if( this.distr )
      {
        phi = Math.acos(-1+(2*i-1)/max);
        theta = Math.sqrt(max*Math.PI)*phi;
      }
      else
      {
        phi = Math.random()*(Math.PI);
        theta = Math.random()*(2*Math.PI);
      }

      this.mcList[i-1].cx = this.state.radius * Math.cos(theta)*Math.sin(phi);
      this.mcList[i-1].cy = this.state.radius * Math.sin(theta)*Math.sin(phi);
      this.mcList[i-1].cz = this.state.radius * Math.cos(phi);
      
      this.aA[i-1].style.left=this.mcList[i-1].cx+this.refs.oDiv.offsetWidth/2-this.mcList[i-1].offsetWidth/2+'px';
      this.aA[i-1].style.top=this.mcList[i-1].cy+this.refs.oDiv.offsetHeight/2-this.mcList[i-1].offsetHeight/2+'px';
    }
  }

  depthSort()
  {
    var i=0;
    var aTmp=[];
  
    for(i=0;i < this.aA.length;i++)
    {
      aTmp.push(this.aA[i]);
    }
  
    aTmp.sort
    (
      function (vItem1, vItem2)
      {
        if(vItem1.cz>vItem2.cz)
        {
          return -1;
        }
        else if(vItem1.cz < vItem2.cz)
        {
          return 1;
        }
        else
        {
          return 0;
        }
      }
    );
    
    for(i=0;i < aTmp.length;i++)
    {
      aTmp[i].style.zIndex=i;
    }
  }

  componentDidMount()
  {
    for(var i=0;i < this.aA.length;i++)
    {
      var oTag={};
    
      oTag.offsetWidth=this.aA[i].offsetWidth;
      oTag.offsetHeight=this.aA[i].offsetHeight;
    
      this.mcList.push(oTag);
    }
    this.sineCosine( 0,0,0 );
    this.positionAll();
    setInterval(this.update,30);
  }

  render() {
    // var items = [];
    // this.aA = [];
    // for (var i = 0; i < this.state.data.length; i++) {
      // var tag = this.state.data[i];
      // items.push(
      //  <a href={"/search/query?query_content="+tag} key={tag} ref={(c) => this.aA.push(c)}>{tag}</a>
      //);
    //}
    return (
      <div ref="oDiv" onMouseOut={this.handleMouseOut} onMouseOver={this.handleMouseOver} onMouseMove={this.handleMouseMove}>
        
      </div>
    );
  }
}

