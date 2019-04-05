import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetail from './BookDetail';

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
        <BookDetail />
      </div>
      )
    }
  }

export default graphql(getBooksQuery)(BookList)