import BookModel from "~~/server/models/Book.model";
import { BookSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
  // Get data form body
  const body = await readBody(event);

  // Check if event.context.params is defined
  if (!event.context.params) {
    throw createError({
      message: "Params are missing in the event context",
    });
  }

  // get id from params
  const id = event.context.params.id;

  // validate
  let { error } = BookSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false,
    });
  }

  // Update book
  try {
    await BookModel.findByIdAndUpdate(id, body);
    return { message: "Author updated" };
  } catch (e) {
    if (e instanceof Error) {
      throw createError({
        message: e.message,
      });
    }
  }
});
