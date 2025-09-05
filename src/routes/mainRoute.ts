import { Router } from "express";
import authRouter from "./authRoute";
import userRouter from "./userRoute";
import gameRouter from "./gameRoute";
import urlRouter from "./urlRoute";
import FavoriteRouter from "./favoriteRouter";

const mainRouter = Router()

mainRouter.use("/auth", authRouter);
mainRouter.use("/usuario", userRouter);
mainRouter.use("/game", gameRouter);
mainRouter.use("/url", urlRouter);
mainRouter.use("/favorite", FavoriteRouter);

export default mainRouter