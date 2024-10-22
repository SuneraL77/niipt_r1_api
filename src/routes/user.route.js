import express from "express";
import trimRequest from "trim-request";
import { createRatingModel, filterRatings, getRatings } from "../controllers/rating.cotroller.js";
import { authMidllware } from "../middleware/authMiddleware.js";


const router = express.Router();
router.route("/rating").post(authMidllware,createRatingModel);
router.route("/rating").get(authMidllware,getRatings);
router.route("/rating/filtr").post(authMidllware,filterRatings)




export default router