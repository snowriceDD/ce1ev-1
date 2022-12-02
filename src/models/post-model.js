import { model } from "mongoose";
import { PostSchema } from "./schemas/post";

const Post = model("posts", PostSchema);

export class PostModel {

    async findAll() {
     const post = await Post.find({});
     return post;
    }

    async findByNumber(postNo) {
        const post = await Post.findOne({ postNo });
        return post;
      }

    async findNewest() {
        const post = await Post.find().sort({ postNo: -1 });
        return post;
    }

    async createPost(postInfo) {
        const createdNewPostw = await Post.create(postInfo);
        return createdNewPostw;
    }

    async update({ postNo, update }) {
        const filter = { postNo };
        const option = { returnOriginal: false };
    
        const updatedPost = await Post.findOneAndUpdate(filter, update, option);
        return updatedPost;
    }

    async deletePost(postNo) {
        const post = await Post.deleteOne({ postNo });
        return post;
    }

}

const postModel = new PostModel();

export { postModel };
