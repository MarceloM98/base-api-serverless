import mongoose from "mongoose";

interface IIndicator {
  _id?: string;
  class_id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
  progress: number;
  performance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IIndicator };
