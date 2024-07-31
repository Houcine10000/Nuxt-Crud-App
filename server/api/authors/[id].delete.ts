import AuthorModel from "~~/server/models/Author.model";

export default defineEventHandler(async (event) => {
  // Check if event.context.params is defined
  if (!event.context.params) {
    throw createError({
      message: "Params are missing in the event context",
    });
  }

  // Get id from params
  const id = event.context.params.id;

  // Remove author
  try {
    await AuthorModel.findByIdAndDelete(id);
    return { message: "Author removed" };
  } catch (e) {
    if (e instanceof Error) {
      throw createError({
        message: e.message,
      });
    }
  }
});
