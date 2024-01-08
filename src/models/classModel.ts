import { model, models, Schema } from "mongoose";

import { CollectionsEnum } from "@/types/TableEnum";
import { IClass } from "@/types/IClass";
import { mongooseErrorValidator } from "@/lib/mongooseErrorValidator";

const ClassSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title"],
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    video: {
      type: String,
    },
    archive: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

mongooseErrorValidator(ClassSchema);

const NewClass =
  models.classes ||
  model<IClass>(CollectionsEnum.Classes, ClassSchema, CollectionsEnum.Classes);

export { NewClass };
