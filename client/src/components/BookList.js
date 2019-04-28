import React, { Component } from 'react';
import BookDetails from './BookDetails';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
  state = {
    selected: null
  }

  displayBooks() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <div>Loading Books...</div>
      )
    } else {
        return data.books.map(book => {
          return <li onClick={e => this.setState({ selected: book.id })} key={book.id}>{book.name}</li>
        }
        )

    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
        <BookDetails bookId={ this.state.selected } />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
