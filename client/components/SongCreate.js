import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: "" };
  }

  onSubmit(event) {
    event.preventDefault();

    //the query variables for mutation can be accessed from the props
    this.props.mutate({
      variables: {
        title: this.state.title,
      },
    });
  }

  render() {
    return (
      <div>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title: </label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.value}
          />
        </form>
      </div>
    );
  }
}

//Below, $title is the query variable of GraphQL Mutation
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
