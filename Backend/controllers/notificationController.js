import notificationModel from '../models/notificationModel.js';

// Create a notification
export const createNotification = async (req, res) => {
    try {
        const { userId, userType, message } = req.body;

        const newNotification = await notificationModel.create({
            userId,
            userType,
            message,
        });

        res.status(201).json({ success: true, data: newNotification });
    } catch (err) {
        console.error("Notification creation error:", err);
        res.status(500).json({ success: false, message: "Failed to create notification" });
    }
};

// Get notifications by userId and userType
export const getNotifications = async (req, res) => {
    try {
        const { userId, userType } = req.query;

        const notifications = await notificationModel.find({ userId, userType }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: notifications });
    } catch (err) {
        console.error("Fetching notifications error:", err);
        res.status(500).json({ success: false, message: "Failed to fetch notifications" });
    }
};

// Optional: Delete or mark as read
