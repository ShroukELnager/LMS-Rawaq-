import { z } from "zod";
import { createGroupSchema } from "./Schema/CreateGroup";

export type CreateGroupFormInput = z.input<typeof createGroupSchema>;
export type CreateGroupFormData = z.infer<typeof createGroupSchema>;
