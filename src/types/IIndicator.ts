interface IIndicator {
  _id?: string;
  class_id: string;
  user_id: string;
  progress: number;
  performance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IIndicator };
