import React from 'react'
import Header from './header'
import "../semantic.css"

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Header/>
        <div className="ui five column divided vertically padded stackable grid">
          <div className="two wide column">
          </div>

          <div className="three wide right aligned column">
            <div className="ui vertical segment">
              
              <div className="ui card">
                <div className="content">
                  <img className="right floated mini ui image" src={require("./SearchLogo.jpg")}/>
                  <div className="header">
                    Software Engineering
                  </div>
                  <div className="meta">
                    Hojas del Verano
                  </div>
                  <div className="description">
                    Design, Development and Maintenance
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <div className="ui basic green button">Approve</div>
                    <div className="ui basic red button">Change</div>
                  </div>
                </div>
              </div>

              <div className="ui card">
                <div className="content">
                  <img className="right floated mini ui image" src={require("./SearchLogo.jpg")}/>
                  <div className="header">
                    Object Oriented
                  </div>
                  <div className="meta">
                    $Teamorl$
                  </div>
                  <div className="description">
                    Project with object
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <div className="ui basic green button">Approve</div>
                    <div className="ui basic red button">Change</div>
                  </div>
                </div>
              </div>

              <div className="ui card">
                <div className="content">
                  <img className="right floated mini ui image" src={require("./SearchLogo.jpg")}/>
                  <div className="header">
                    Software Engineering
                  </div>
                  <div className="meta">
                    Hojas del Verano
                  </div>
                  <div className="description">
                    Design, Development and Maintenance
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui two buttons">
                    <div className="ui basic green button">Approve</div>
                    <div className="ui basic red button">Change</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="six wide middle aligned center aligned column">
            <div className="ui vertical segment">
              <div id="div1">
                <a href="/search/query?query_content=Haskell" className="blue">Haskell</a>
                <a href="/search/query?query_content=object-oriented" className="red">OO</a>
                <a href="/search/query?query_content=os" className="blue">OS</a>
                <a href="/search/query?query_content=compiler">compiler</a>
                <a href="/search/query?query_content=c++" className="blue">C++</a>
                <a href="/search/query?query_content=ruby" className="red">Ruby</a>
                <a href="/search/query?query_content=tex" className="green">Tex</a>
                <a href="/search/query?query_content=javascript" className="yellow">JS</a>
                <a href="/search/query?query_content=jvm" className="red">JVM</a>
                <a href="/search/query?query_content=css" className="green">CSS</a>
                <a href="/search/query?query_content=Android" className="blue">Android</a>
                <a href="/search/query?query_content=class" className="yellow">class</a>
                <a href="/search/query?query_content=mips" className="green">Mips</a>
                <a href="/search/query?query_content=x86" className="red">x86</a>
                <a href="/search/query?query_content=ARM" className="blue">ARM</a>
                <a href="/search/query?query_content=XHTML" className="yellow">XHTML</a>
                <a href="/search/query?query_content=MySQL" className="blue">MySQL</a>
                <a href="/search/query?query_content=jQuery" className="red">jQuery</a>
                <a href="/search/query?query_content=java" className="blue">Java</a>
                <a href="/search/query?query_content=Pyhton" className="yellow">Python</a>
                <a href="/search/query?query_content=bigdata" className="pink">Bigdata</a>
                <a href="/search/query?query_content=Linux" className="blue">Linux</a>
                <a href="/search/query?query_content=C" className="green">C</a>
                <a href="/search/query?query_content=C#" className="red">C#</a>
                <a href="/search/query?query_content=VB" className="blue">VB</a>
                <a href="/search/query?query_content=RSA" className="red">RSA</a>
                <a href="/search/query?query_content=pascal" className="purple">Pascal</a>
                <a href="/search/query?query_content=scrapy" className="yellow">scrapy</a>
                <a href="/search/query?query_content=Lisp" className="blue">Lisp</a>
                <a href="/search/query?query_content=matlab" className="red">matlab</a>
                <a href="/search/query?query_content=TCP" className="pink">TCP</a>
                <a href="/search/query?query_content=jre" className="red">jre</a>
                <a href="/search/query?query_content=VS" className="pink">VS</a>
              </div>
              <h2 className="ui header">
                <div className="content">
                  Search With Tags
                </div>
              </h2>
            </div>

            <div className="ui vertical segment">
              <form className="ui form" action="/search/query/" method="get">
                <div className="ui large fluid search">
                  <div className="ui icon fluid input">
                    <input className="prompt" placeholder="Search..." type="text" name="query_content"/>
                    <i className="search icon"></i>
                  </div>
                  <div className="results"></div>
                </div>
                <div className="ui vertical segment">
                  <button className="ui blue basic button submit" type="submit">
                    <i className="icon tag"></i>
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="three wide column">
            <div className="ui vertical segment">
              <div className="ui one column padded grid">
                <div className="red column">test1</div>
                <div className="blue column">test2</div>
                <div className="teal column">test3</div>
              </div>
            </div>
          </div>

          <div className="two wide column">
          </div>
        </div>
      </div>
    );
  }
}
