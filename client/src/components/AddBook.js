import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';



class AddBook extends Component {

  displayAuthors() {
    const { data } = this.props;
    const { loading, authors } = data;
    if(loading) {
      return <option disabled>Loading Authors...</option>
    } else {
      return authors.map(author => {
        const { id, name } = author;
        return <option key={id} value={id}>{name}</option>
      })
    }
  }

  render() {
    return (
      <form id="add-book">

        <div className="field">
          <label>Book name:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select Author:</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button type="button">+</button>
      </form>
    )
  }
}


export default graphql(getAuthorsQuery)(AddBook);