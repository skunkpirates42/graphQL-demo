import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  displayAuthors() {
    const { getAuthorsQuery } = this.props;
    const { loading, authors } = getAuthorsQuery;
    if(loading) {
      return <option disabled>Loading Authors...</option>
    } else {
      return authors.map(author => {
        const { id, name } = author;
        return <option key={id} value={id}>{name}</option>
      })
    }
  }

  submitForm(e) {
    const { addBookMutation } = this.props;
    const { name, genre, authorId } = this.state;
    e.preventDefault();
    addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form onSubmit={(e) => this.submitForm(e)} id="add-book">

        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={e => this.setState({ name: e.target.value})}/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={e => this.setState({ genre: e.target.value})}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value})}>
            <option>Select Author:</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button type="submit">+</button>
      </form>
    )
  }
}


export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);