// this is a controller file for user
// all the code realted to user route will be written here
import { User } from "../models/user.model.js";
// this function is for getting the user
import { Message } from "../models/message.model.js";
// this function is for getting the messages

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

export const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		next(error);
	}
};