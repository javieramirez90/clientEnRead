import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

class BookList extends Component {
  
  displayBooks = () => {
    let { data }  = this.props
    let { books } =  this.props.data;
    if(data.loading){
      return(
        <div>Cargando libros</div>
      );
    } else {
      return (
        <ul id="book-list">
        {books.map((book, i) => {
        return(
          <li key={book.id}>{book.name}</li>
        )
      })}
      </ul>
      )
    }
  }

  render() {
    return(
      <div>
        { this.displayBooks() }
      </div>
      )
    }
  }

export default graphql(getBooksQuery)(BookList)