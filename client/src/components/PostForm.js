import { useMutation } from "@apollo/client";
import { ValuesOfCorrectTypeRule } from "graphql";
import React from "react";
import { Button, Form } from "semantic-ui-react";

import { CREATE_POST_MUTATION, GET_POSTS_QUERY } from "../graphql/Post";
import { useForm } from "../utils/hooks";

function PostForm() {
  const initialState = {
    body: "",
  };
  const { values, onChange, onSubmit } = useForm(
    createPostCallback,
    initialState
  );

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({ query: GET_POSTS_QUERY });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: GET_POSTS_QUERY, data });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Say something"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="orange">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">{error.graphQLErrors[0].message}</ul>
        </div>
      )}
    </>
  );
}

export default PostForm;
