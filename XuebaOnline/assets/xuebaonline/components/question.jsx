import React from 'react'
import Header from './header'
import "../semantic.css"

export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div className="ui segment">
          <div className="ui stackable grid">
            <div className="four wide center aligned middle aligned column">
              <div className="ui three equal width grid">
                <div className="column">
                  <div className="ui item">
                    <div className="content">
                      <h4 className="ui header">
                        17
                        <div className="sub header">votes</div>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="blue column">
                  <div className="ui item">
                    <div className="content">
                      <h4 className="ui header">7
                        <div className="sub header">replys</div> </h4>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="ui item">
                    <div className="content">
                      <h4 className="ui header">{typeof(this.props.views)=="undefined"?'17':this.props.views}
                        <div className="sub header">views</div>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="twelve wide column">
              <div className="row">
                <h4 className="ui header">
                  <i className="announcement icon"></i>
                  <a className="content">
                    {typeof(this.props.title)=="undefined"?
                                               "How JVM identity regular expression such as @\"$teamorl^\" in C#'s grammer" :
                                               this.props.title
                      }
                  </a>
                </h4>
              </div>
              <div className="row">
                <div className="ui grid">
                  <div className="twelve wide column">
                    <a className="ui tag label">JVM</a>
                    <a className="ui tag label">Regex</a>
                    <a className="ui tag label">C#</a>
                    <a className="ui tag label">teamorl</a>
                  </div>
                  <div className="four wide column">
                    <div className="two ui large buttons">
                      <button className="ui icon blue button">
                        <i className="edit icon"></i>
                      </button>
                      <button className="ui icon button">
                        <i className="remove icon"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
