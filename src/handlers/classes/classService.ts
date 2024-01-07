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

const list = async ({ title = null, description = null, video = 1 }, user) => {
  let query = {};
  if (title) {
    query["title"] = new RegExp(title, "i");
  }
  if (description) {
    query["description"] = new RegExp(description, "i");
  }
  const classes = await NewClass.find(query);

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

const classService = {
  create,
  list,
  update,
  remove,
  updateProgress,
};

export { classService };
