import { model, models, Schema } from "mongoose";

import { CollectionsEnum } from "@/types/TableEnum";
import { IIndicator } from "@/types/IIndicator";
import { mongooseErrorValidator } from "@/lib/mongooseErrorValidator";

const IndicatorSchema = new Schema(
  {
    class_id: {
      type: String,
      required: [true, "class_id"],
    },
    user_id: {
      type: String,
      required: [true, "user_id"],
    },
    progress: {
      type: String,
      required: [true, "progress"],
    },
    performance: {
      type: String,
      required: [true, "performance"],
    },
  },
  {
    timestamps: true,
  }
);

mongooseErrorValidator(IndicatorSchema);

const Indicator =
  models.indicators ||
  model<IIndicator>(
    CollectionsEnum.Indicators,
    IndicatorSchema,
    CollectionsEnum.Indicators
  );

export { Indicator };
