const React  = require('react')
    , Filter = require('./filter.js')
    , Rx     = require('rx')
    , RxReact = require('rx-react')
    , R      = require('ramda')

var Table = React.createClass({
    getInitialState () {
      return {
          filterCount: 1
        , filter: ''
        , filterer: RxReact.FuncSubject.create()
        , column: -1
      }
    }

  , componentWillMount () {
    this.state.filterer
      .subscribe((value) => {
        this.setState({filter: value})
      })
    }

  , mkHeaders () {
      return R.map((x) => <th>{x}</th>, R.head(this.props.children))
    }

  , mkOptions () {
      return <select onChange={(x) => {this.setState({column: x.target.value})}}><option></option>{R.compose(R.map(x => <option>{x}</option>), R.head)(this.props.children)}</select>
    }

  , mkRows () {
    let filterer = this.state.filter
    let index = R.head(this.props.children).indexOf(this.state.column)
    let data = this.state.column === -1 || filterer === '' ?
      R.tail(this.props.children):
      R.filter(x => {
        //console.log(x)
       return R.defaultTo("", x[index]).slice(0, filterer.length) === filterer
     }, R.tail(this.props.children))

      return R.map(R.compose((y => <tr>{y}</tr>), R.map(x => <td>{x}</td>)), data)
    }

  , render () {

      return (
      <section className="table">
        <div>
          <table style={{position: "fixed", backgroundColor: "white", maxWidth: 600}}>
            <thead>
              {this.mkHeaders()}
            </thead>
            <tbody></tbody>
          </table>
          <table>
            <thead>
              {this.mkHeaders()}
            </thead>
            <tbody>
              {this.mkRows()}
            </tbody>
          </table>
        </div>
        <nav style={{position:"fixed", bottom:0, backgroundColor:"white", width: "100%"}}>
          Filter: <Filter options={this.mkOptions()} filter={this.state.filterer}></Filter>
        </nav>

      </section>
      )
    }
})

module.exports = Table;
