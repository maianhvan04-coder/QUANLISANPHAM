import { http } from "@/lib/utils/http";
import { createUserSchema, type CreateUserInput } from "@/lib/validations/user.schema";

export const userApi = {
  create: async (body: CreateUserInput) => {
    const payload = createUserSchema.parse(body);
    return (await http.post("/api/users", payload)).data;
  },
};
