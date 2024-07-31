import BookModel from "~/server/models/Book.model";

export default defineEventHandler(async (event) => {
  // Check if event.context.params is defined
  if (!event.context.params) {
    throw createError({
      message: "Params are missing in the event context",
    });
  }
  // get id from params
  const id = event.context.params.id;

  // Remove book
  try {
    await BookModel.findByIdAndUpdate(id);
    return { message: "Book removed" };
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
