import express from "express"
import { deleteAsync, getByUser, postAsync, updateAsync } from "../controllers/favoriteController";
import { authenticate } from "../controllers/authController";

const FavoriteRouter = express.Router()

FavoriteRouter.post("/", authenticate, postAsync);
FavoriteRouter.delete("/", authenticate, deleteAsync);
FavoriteRouter.get("/user/:id", getByUser);
FavoriteRouter.put("/", authenticate, updateAsync);

export default FavoriteRouter