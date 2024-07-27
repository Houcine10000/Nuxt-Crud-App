import AuthorModel from "~/server/models/Author.model";
import { AuthorSchema } from "~/server/validation";

export default defineCachedEventHandler(async (event) => {
  // Get data from body
  const body = await readBody(event);

  // get id from params
  const id = event.context.params.id;

  // validation
  let { error } = AuthorSchema.validate(body, {
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

  // create book
  try {
    await AuthorModel.findByIdAndUpdate(id, body);
    return { message: "Author updated" };
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
