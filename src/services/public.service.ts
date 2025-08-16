import NotificationSchema, { INotification } from '../models/notificaiton.model';


export const getAllNotification = async (userId: string): Promise<INotification[]> => {
    return await NotificationSchema.find({ userId }).sort({ date: -1 });
};

export const createNotification = async (
    Id: string,
    msm: string,
): Promise<INotification> => {
    const notification = new NotificationSchema({
        userId: Id,
        message: msm,
        date: new Date(),
    });
    return await notification.save();
};



export default {
    createNotification,
    getAllNotification,
};