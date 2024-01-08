import { error } from "@/lib/error";
import { NewClass } from "@/models/classModel";
import { Indicator } from "@/models/indicatorModel";
import { IUser } from "@/types/IUser";
import { IClass } from "@/types/IClass";
import { logService } from "../log/logService";
import { classErrors } from "./classErrors";

const create = async (data: IClass, user: IUser) => {
  const newClass = await NewClass.create(data);

  await logService.create({
    user: user._id,
    event: "Criar classe",
    detail: `Classe com id ${newClass._id} criado com sucesso!`,
  });

  return newClass;
};

const list = async (
  {
    title = null,
    description = null,
    video = 0,
    progress = null,
    performance = null,
  },
  user
) => {
  let query = {};
  if (title) {
    query["title"] = new RegExp(title, "i");
  }
  if (description) {
    query["description"] = new RegExp(description, "i");
  }
  if (video == 1) {
    query["video"] = { $exists: true };
  }

  if (progress) {
    query["progress"] = progress == 1 ? { $eq: 100 } : { $lt: 100 };
  }

  if (performance) {
    query["performance"] = { $lte: parseInt(performance) };
  }

  const classes = NewClass.aggregate([
    {
      $lookup: {
        from: Indicator.collection.name,
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$$id", "$class_id"] },
                  { $eq: [user._id, "$user_id"] },
                ],
              },
            },
          },
          { $unset: "class_id" },
        ],
        as: "fromIndicators",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ["$fromIndicators", 0] }, "$$ROOT"],
        },
      },
    },
    { $project: { fromIndicators: 0 } },
    { $match: query },
  ]);

  await logService.create({
    user: user._id,
    event: "Listar Classes",
    detail: "Foram listadas as classes!",
  });

  return classes;
};

const update = async ({ _id, ...body }, user: IUser) => {
  if (!_id) {
    throw error.buildSchemaValidationError({
      message: "ID da classe não foi informado!",
    });
  }

  const updatedClass = await NewClass.findByIdAndUpdate(_id, body, {
    new: true,
  });

  if (!updatedClass) {
    throw classErrors.buildClassNotFoundError(_id);
  }

  await logService.create({
    user: user._id,
    event: "Alterar Classe",
    detail: `Classe com id ${_id} alterada com sucesso!`,
  });

  return updatedClass;
};

const remove = async (classId: string, user: IUser) => {
  const selectedClass = await NewClass.findById(classId);

  if (!selectedClass) {
    throw classErrors.buildClassNotFoundError(classId);
  }

  const removedClass = await NewClass.findByIdAndRemove(classId);

  await logService.create({
    user: user._id,
    event: "Remover Classe",
    detail: `A classe com o id ${classId} foi removida com sucesso!`,
  });

  return removedClass;
};

const updateProgress = async (
  classId: any,
  { progress, performance },
  user: IUser
) => {
  if (!classId) {
    throw error.buildSchemaValidationError({
      message: "ID da classe não foi informado!",
    });
  }

  if (!user._id) {
    throw error.buildSchemaValidationError({
      message: "ID do usuário não foi informado!",
    });
  }
  if (!progress) {
    throw error.buildSchemaValidationError({
      message: "O progresso não foi informado!",
    });
  }
  if (!performance) {
    throw error.buildSchemaValidationError({
      message: "A performance não foi informada!",
    });
  }

  const updatedIndicator = await Indicator.findOneAndUpdate(
    { class_id: classId, user_id: user._id },
    { $max: { progress }, performance },
    {
      new: true,
      upsert: true,
    }
  );

  await logService.create({
    user: user._id,
    event: "Alterar Indicador",
    detail: `Progresso da classe com id ${classId} alterada com sucesso!`,
  });

  return updatedIndicator;
};

const listIndicator = async ({ sort = null }) => {
  let indicators = Indicator.aggregate([
    {
      $match: {
        progress: 100,
      },
    },
    {
      $group: {
        _id: "$class_id",
        totalUsers: { $sum: 1 },
        averagePerformance: { $avg: "$performance" },
      },
    },
  ]);

  if (sort) {
    indicators = indicators.sort({ [sort]: -1 });
  }
  return await indicators;
};

const classService = {
  create,
  list,
  update,
  remove,
  updateProgress,
  listIndicator,
};

export { classService };
