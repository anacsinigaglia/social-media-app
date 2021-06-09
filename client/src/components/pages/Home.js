import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, GridColumn } from "semantic-ui-react";

import { AuthContext } from "../../context/auth";

import { GET_POSTS_QUERY } from "../../graphql/Post";
import PostCard from "../PostCard";
import PostForm from "../PostForm";

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts },
  } = useQuery(GET_POSTS_QUERY);

  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <GridColumn>
            <PostForm />
          </GridColumn>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 25 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
