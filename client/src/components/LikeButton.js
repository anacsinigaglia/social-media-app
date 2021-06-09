import React, { useEffect, useState } from "react";
import { Icon, Label, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { LIKE_POST_MUTATION } from "../graphql/Post";

function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="orange">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="orange" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="orange" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label as="a" basic color="orange" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </>
  );
}

export default LikeButton;
