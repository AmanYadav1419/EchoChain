// this is a controller file for auth route
// all the code realted to auth route will be written here

import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    // destructure the user data which is getting from request.body
    const { id, firstName, lastName, imageUrl } = req.body;

    // first we need to check if user is already exists in database
    // findOne user where clerkId is id
    const user = await User.findOne({ clerkID: id });

    // if user is not found that means they are signing up for the first time
    if (!user) {
      // signUp of user
      User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    // send the success message if user created sucessfully
    res.status(200).json({ success: true });
  } catch (error) {
    // just for this time , we can update the error format and message in future
    console.log("Error in auth callback", error);

    // now we are sending the error to the error handler middleware
    next(error);
  }
};
