// this is file for middleware of auth
import { clerkClient } from "@clerk/express";

// this function is for checking user is authenticated or not
export const protectRoute = async (req, res, next) => {
  // if this value is false then
  if (!req.auth.userId) {
    // that means user is not authenticated
    // send the status code of 401 => unauthorized
    return res
      .status(401)
      .json({ message: "unauthorized - You Must be logged in" });
  }

  // and if user is authenticated then call the next function
  // and next function is whatever next is coming in code
  next();
};

// this function is for checking user is admin or not
export const requireAdmin = async (req, res, next) => {
  try {
    // get the user from clerk
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    // if user is not admin then
    if (!isAdmin) {
      // then send the error status code of unauthorized
      return res
        .status(403)
        .json({ message: "unauthorized - You Must be logged in" });
    }
    // and if user is authenticated then call the next function
    // and next function is whatever next is coming in code
    next();
    // handle the error
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
