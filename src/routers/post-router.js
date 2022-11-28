import is from "@sindresorhus/is";
import { Router } from "express";
import { postService } from "../services/post-service";


const postRouter = Router();

postRouter.get("/posts", async(req, res, next)=> {
    try {
        const post = await postService.getPosts();

        res.status(200).json(post);
    } catch(err) {
        next(err);
    }
});

postRouter.get("/posts/:postNo", async (req,res, next)=> {
    const postNo = req.params.postNo;
    try{
        const post = await postService.getPostNumber(postNo);
        res.status(200).json(post);
    } catch(err) {
        next(err)
    }
});

postRouter.post("/posts", async (req, res, next)=> {
    try {
        if(is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요."
            );
        }

        const {title, content, user, password, count} = req.body;
        const newPost = await postService.addPost({
            title,
            content,
            user, 
            password,
            count
        });

        res.status(201).json(newPost);

    }catch(err) {
        next(err);
    }
});

postRouter.delete("/posts/:postNo", async(req, res, next)=> {
    try {
        const postNo = req.params.postNo;
        const post = await postService.deletePost(postNo);

        res.status(200).json(post);

    }catch(err){
        next(err)
    }
})

postRouter.patch("/posts/:postNo", async(req, res, next)=> {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
              "headers의 Content-Type을 application/json으로 설정해주세요."
            );
        }

        const postNo = req.params.postNo;
        const {title, content, count} = req.body;

        const toUpdate = {
            ...(title && {title}),
            ...(content && {content}),
            ...(count && {count})
        };

        const updatePost = await postService.setPost(postNo, toUpdate);
        res.status(200).json(updatePost);

    } catch(err) {
        next(err);
    }
})



export {postRouter};