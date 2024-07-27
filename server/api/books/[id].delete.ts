import BookModel from "~/server/models/Book.model";

export default defineCachedEventHandler(async (event) => {
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
})
