import { postModel } from "../models";

class PostService {
    constructor(model) {
      this.model = model;
    }

    async getPosts(){
        const posts = await this.model.findAll({});
        return posts;
    }

    async getPostNumber(postNo) {
        const order = await this.model.findByNumber(postNo);
        return order;
    }

    async addPost(postInfo) {
        const curObj = await this.model.findNewest();
        const curNum = curObj[0].postNo;
        const {userEmail, title, content, user, password, count} = postInfo;
        const postNo = curNum + 1;
        const newPostInfo = {postNo, userEmail, title, content, user, password, count}

        const createdNewReview = await this.model.createPost(newPostInfo);
    
        return createdNewReview;
    }

    async setPost(postNo, toUpdate) {
        const updatePost = await this.model.update({
            postNo,
            update: toUpdate,
        });

        return updatePost;
    }


    async deletePost(postNo) {
        const post = await this.model.deletePost(postNo);
        return post;
    }

}

const postService = new PostService(postModel);

export { postService };
