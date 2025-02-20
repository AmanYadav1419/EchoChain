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

// Function to get messages between the authenticated user and another user
export const getMessages = async (req, res, next) => {
	try {
		// Extract the authenticated user's ID from the request
		const myId = req.auth.userId;
		// Extract the other user's ID from the request parameters
		const { userId } = req.params;

		// Query the database for messages where:
		// - The authenticated user sent messages to the other user OR
		// - The authenticated user received messages from the other user
		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId }, // Messages sent by the other user to me
				{ senderId: myId, receiverId: userId }, // Messages sent by me to the other user
			],
		}).sort({ createdAt: 1 }); // Sort messages by creation time in ascending order (oldest first)

		// Send the retrieved messages as a JSON response with a 200 (OK) status
		res.status(200).json(messages);
	} catch (error) {
		// Pass any errors to the error-handling middleware
		next(error);
	}
};