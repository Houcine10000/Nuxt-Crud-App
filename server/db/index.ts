import mongoose from "mongoose";

interface NitroApp {
  // Define the properties and their types if known
}

export default async (_nitroApp: NitroApp) => {
  //run your connect code here
  const config = useRuntimeConfig();
  // connect to mogodb
  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));
};
