// this is a controller file for user
// all the code realted to user route will be written here
import { User } from "../models/user.model.js";
// this function is for getting the user
export const getAllUsers = async (req, res, next) => {
  try {
    // get the current user id
    const currentUserId = req.auth.userId;
    // get all the users 
    // wherer clerk id is not equal to currentUserId, so that we don't see us, or don't get currentUser name in list
    const users = await User.find({clerkId: {$ne:currentUserId}});

    // then send the users
    res.status(200).json(users);
  } catch (error) {
    // error handling middleware
    next(error);
  }
};
