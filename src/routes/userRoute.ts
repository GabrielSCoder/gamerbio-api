import express from "express";
import { postAsync, deleteAsync, getAsync, updateAsync, getUsernameAsync, verifyUsernameAsync, verifyPassword, postDefaultsAsync } from "../controllers/userController";
import { authenticate } from "../controllers/authController";

const userRouter = express.Router();

userRouter.put("/", authenticate, updateAsync);
userRouter.get("/:id", getAsync);
userRouter.delete("/:id", deleteAsync);


userRouter.post("/", postAsync);
userRouter.post("/default", postDefaultsAsync);
userRouter.post("/verify/password", verifyPassword);
userRouter.get("/find/:username", getUsernameAsync);
userRouter.post("/verify/username", verifyUsernameAsync);


export default userRouter;
