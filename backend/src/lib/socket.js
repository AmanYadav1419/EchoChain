import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

// Function to initialize the Socket.IO server
export const initializeSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",  // Allow connections from frontend running on localhost:3000
			credentials: true, // Enable credentials for secure communication
		},
	});

	const userSockets = new Map(); // Map to store userId and their corresponding socketId
	const userActivities = new Map(); // Map to store userId and their current activity status

	io.on("connection", (socket) => {
		// Event listener when a user connects
		socket.on("user_connected", (userId) => {
			userSockets.set(userId, socket.id); // Store user's socket ID
			userActivities.set(userId, "Idle"); // Set default activity status to 'Idle'

			// Notify all connected clients about the new user
			io.emit("user_connected", userId);

			// Send a list of currently online users to the newly connected user
			socket.emit("users_online", Array.from(userSockets.keys()));

			// Broadcast updated activities of all users
			io.emit("activities", Array.from(userActivities.entries()));
		});

		// Event listener for updating user activity
		socket.on("update_activity", ({ userId, activity }) => {
			console.log("activity updated", userId, activity);
			userActivities.set(userId, activity);  // Update user's activity status
			io.emit("activity_updated", { userId, activity });  // Broadcast updated activity to all clients
		});

		// Event listener for sending messages
		socket.on("send_message", async (data) => {
			try {
				const { senderId, receiverId, content } = data;

				// Save message to the database
				const message = await Message.create({
					senderId,
					receiverId,
					content,
				});

				// send message to receiver in realtime, if they're online
				const receiverSocketId = userSockets.get(receiverId);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("receive_message", message);
				}

				// Acknowledge message sent to sender
				socket.emit("message_sent", message);
			} catch (error) {
				console.error("Message error:", error);
				socket.emit("message_error", error.message);  // Send error message back to sender
			}
		});

		// Event listener for user disconnecting
		socket.on("disconnect", () => {
			let disconnectedUserId;
			for (const [userId, socketId] of userSockets.entries()) {
				// Find the disconnected user by matching the socket ID
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					userSockets.delete(userId);  // Remove user from the active sockets map
					userActivities.delete(userId);  // Remove user from activity map
					break;
				}
			}
			if (disconnectedUserId) {
				io.emit("user_disconnected", disconnectedUserId);  // Notify all clients about the disconnected user
			}
		});
	});
};