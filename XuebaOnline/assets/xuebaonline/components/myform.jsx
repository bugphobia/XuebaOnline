import React from 'react'
import "../semantic.css"

export default class MyForm extends React.component
{
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.error) {
      return ()
    }
  }
}
