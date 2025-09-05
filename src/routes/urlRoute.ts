import express from "express"
import { getAsync, deleteAsync, getByUser, postAsync, updateAsync } from "../controllers/urlController";
import { authenticate } from "../controllers/authController";

const urlRouter = express.Router()

urlRouter.get("/:id", getAsync);
urlRouter.post("/", authenticate, postAsync);
urlRouter.delete("/", authenticate, deleteAsync);
urlRouter.get("/user/:id", getByUser);
urlRouter.put("/", authenticate, updateAsync);

export default urlRouter