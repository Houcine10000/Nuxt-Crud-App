import mongoose from "mongoose";

// Author schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);
export default mongoose.model("Author", schema);
