import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
    userId: string;
    message: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema: Schema = new Schema<INotification>(
    {
        userId: { type: String, required: true },
        message: { type: String, required: true },
        date: { type: Date, required: true, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model<INotification>('Notification_gardepharma', NotificationSchema);
 