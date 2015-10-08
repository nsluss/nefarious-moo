var React      = require('react')
  , Table      = require('./table.js')


var App = React.createClass({
  render () {
     return (
      <Table style={{marginTop:0, top:0}}>{this.props.data}</Table>
    )
  }
});

$.get('/data/10000', (data) => {
  React.render(<App data={data.split('\n').map(x => x.split(','))}/>, document.querySelector('#app'))
})
