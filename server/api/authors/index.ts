import AuthorModel from "~/server/models/Author.model";

export default defineCachedEventHandler(async (event) => {
  // return all authors
  return await AuthorModel.find();
});
