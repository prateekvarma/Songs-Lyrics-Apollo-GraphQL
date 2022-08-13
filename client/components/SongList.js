import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo"; //Glue layer between react & Apollo data
import { Link } from "react-router";

import query from "../queries/fetchSongs";

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({ variables: { id: id } })
      .then(() => this.props.data.refetch()); //this refetch is already available in the props from the "react-apollo" lib
  }

  renderSongs() {
    return this.props.data.songs.map((song) => {
      return (
        <li key={song.id} className="collection-item">
          {song.title}
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(song.id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div>{this.renderSongs()}</div>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
