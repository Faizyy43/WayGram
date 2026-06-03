import { Router } from "express";
import auth from "../middleware/auth.js";
import postCtrl from "../controllers/postCtrl.js";

const router = Router();

router.route("/posts")
  .post(auth, postCtrl.createPost)
  .get(auth, postCtrl.getPosts);

router.route("/post/:id")
  .patch(auth, postCtrl.updatePost)
  .get(auth, postCtrl.getPost)
  .delete(auth, postCtrl.deletePost);

router.patch("/post/:id/like", auth, postCtrl.likePost);
router.patch("/post/:id/unlike", auth, postCtrl.unLikePost);

router.patch("/post/:id/report", auth, postCtrl.reportPost);

router.get("/user_posts/:id", auth, postCtrl.getUserPosts);

router.get("/post_discover", auth, postCtrl.getPostDiscover);

router.patch("/savePost/:id", auth, postCtrl.savePost);
router.patch("/unSavePost/:id", auth, postCtrl.unSavePost);
router.get("/getSavePosts", auth, postCtrl.getSavePost);




export default router;
