import dotenv from "dotenv";
import connectDB from "./db/index";
import { app } from "./app";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config({
  path: "./.env",
});
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Full Stack Fleet Management System",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/api/v1",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};
const specs = swaggerJsdoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
connectDB;
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err: any) => {
    console.log("MONGO db connection failed !!! ", err);
  });

// "exec": "concurrently \"npx tsc --watch\" \"ts-node src/index.ts\""
