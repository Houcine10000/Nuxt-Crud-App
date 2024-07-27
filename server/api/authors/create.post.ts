import AuthorModel from "~/server/models/Author.model";
import { AuthorSchema } from "~/server/validation";

export default defineCachedEventHandler(async (event) => {
  // Get data from body
  const body = await readBody(event);

  // validate
  let { error } = AuthorSchema.validate(body);
  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false,
    });
  }

  // create book
  try {
    await AuthorModel.create(body);
    return { message: "Author created" };
  } catch (e) {
    if (e instanceof Error) {
      throw createError({
        message: e.message,
      });
    } else {
      throw createError({
        message: "An unknown error occurred.",
      });
    }
  }
});
