import { model, Schema } from "mongoose";

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String, //"analytics"
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users", //passes the table/collection is uses
  },
});

export default model("Post", postSchema);
