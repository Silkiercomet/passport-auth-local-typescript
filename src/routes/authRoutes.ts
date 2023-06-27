import express from "express";
import passport from "passport";
import { logIn, logOut, singUp, isAuthenticated } from "../controllers/auth";
const router = express.Router();

router.post("/login", passport.authenticate("local"), logIn);
router.post("/signup", singUp);
router.post("/logout", logOut);
router.get("/protected-route", isAuthenticated, (req, res) => {
  res.status(200).send("<h1>authorized to see the protected branch</h1>");
});

export default router;
