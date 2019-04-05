import React, { Component } from 'react'; 
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from "../queries/queries";

class AddBook extends Component {
  
  authorOptions = (x) => {
    let { data }  = this.props
    if(data.loading){
      return(
        <select>
          <option>Cargando autores</option>
        </select>
      );
    } else {
      return( 
        <select>
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

  render() {
    console.log(this.props.data)
    let { authors } = this.props.data
    return (
      <form action="" id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text"/>
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

export default graphql(getAuthorsQuery)(AddBook);