import express from "express"
import { searchGame } from "../controllers/gameController"

const gameRouter = express.Router()

gameRouter.get("/find/:game", searchGame);

export default gameRouter