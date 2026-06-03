import { Router } from "express";
import auth from "../middleware/auth.js";
import messageCtrl from "../controllers/messageCtrl.js";

const router = Router();

router.post("/message", auth, messageCtrl.createMessage);

router.get("/conversations", auth, messageCtrl.getConversations);

router.get("/message/:id", auth, messageCtrl.getMessages);


export default router;
