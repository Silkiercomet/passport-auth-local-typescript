import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../model/User";

export const singUp = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json("invalid user, theres already an user with that name ");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "user register completed" });
  } catch (err) {
    console.log(err);
  }
};

export const logIn = (req: Request, res: Response) => {
  res.status(200).json("authorized user");
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    // If the user is authenticated, allow access to the next middleware or route handler
    return next();
  }

  // If the user is not authenticated, redirect or send an error response
  res.status(401).json({ message: "Unauthorized" });
};

export const logOut = (req: Request, res: Response) => {
  // Call req.logout() with a callback function
  req.logout((err) => {
    if (err) {
      // Handle any errors that occur during logout
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }

    // Optionally, you can clear the session to remove all session data
    req.session.destroy((err) => {
      if (err) {
        // Handle any errors that occur during session destruction
        console.error(err);
        return res.status(500).json({ message: "Logout failed" });
      }

      // Redirect or send a response indicating successful logout
      res.json({ message: "Logged out successfully" });
    });
  });
};
