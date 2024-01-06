// import { error } from '@/lib/error'
import { NewClass } from "@/models/classModel";
import { IUser } from "@/types/IUser";
import { IClass } from "@/types/IClass";
import { logService } from "../log/logService";

const create = async (data: IClass, user: IUser) => {
  const newClass = await NewClass.create(data);

  await logService.create({
    user: user._id,
    event: "Criar classe",
    detail: `Classe com id ${newClass._id} criado com sucesso!`,
  });

  return newClass;
};

const classService = {
  create,
};

export { classService };
