import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetail extends Component {

  displayBookDetails = () => {
      const { book } = this.props.data
      console.log(this.props)
      if(book){
        return(
          <div>
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <p>All books by this author: </p>
            <ul className="other-books">
              { book.author.books.map(book => {
                return <li key={book.id}>{book.name}</li>
              })}
            </ul>
          </div>
        )
      } else {
        return <div>Selecciona un libro.</div>
      }
  }
  render() {
    
    

    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetail);