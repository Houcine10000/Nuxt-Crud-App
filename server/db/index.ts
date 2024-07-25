import mongoose from "mongoose";

export default async (nitroApp) => {
  //run your connect code here
  const config = useRuntimeConfig();
  // connect to mogodb
  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("Connected to Db"))
    .catch((e) => console.log(e));
};
