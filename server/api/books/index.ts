import BookModel from "~/server/models/Book.model";

export default defineCachedEventHandler(async (event) => {
  return await BookModel.find().populate("authors");
});
