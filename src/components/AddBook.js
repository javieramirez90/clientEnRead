import React, { Component } from 'react'; 
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {
  constructor(props){
    super(props);
      this.state = {
        name: '',
        genre: '',
        authorId: ''
    }
  }
  
  authorOptions = (x) => {
    let { loading }  = this.props.getAuthorsQuery
    if(loading){
      return(
        <select >
          <option>Cargando autores</option>
        </select>
      );
    } else {
      return( 
        <select onChange={e => this.setState({authorId: e.target.value})}>
          <option>Select author: </option>
        {x.map((author) => {
            return(
              <option key={author.id} value={author.id}>{author.name}</option>
            )
          })}
          </select>
          ) 
        } 
  }

  submitForm = (e) => {
    e.preventDefault()
    this.props.addBookMutation({
      variables:{
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [ { query: getBooksQuery } ]
    })
  }

  render() {
    let { authors } = this.props.getAuthorsQuery
    return (
      <form action="" id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={e => this.setState({name: e.target.value})}/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={e => this.setState({genre: e.target.value})}/>
        </div>

        <div className="field">
          <label>Author:</label>
            {this.authorOptions(authors)}
        </div>

        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);