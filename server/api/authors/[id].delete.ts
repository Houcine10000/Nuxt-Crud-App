import AuthorModel from "~/server/models/Author.model";

export default defineCachedEventHandler(async (event) => {
  // get id from params
  const id = event.context.params.id;

  // Remove book
  try {
    await AuthorModel.findByIdAndUpdate(id);
    return { message: "Author removed" };
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
