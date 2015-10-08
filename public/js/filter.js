const React = require('react');

var Filter = React.createClass({
  render () {
    return (
      <span>
        {this.props.options}
        <input onInput={x => this.props.filter(x.target.value)} placeholder="search..."></input>
      </span>
    )
  }
})

module.exports = Filter;
