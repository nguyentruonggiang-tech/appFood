import express from "express";
import cors from "cors";
import rootRouter from "./src/routers/root.router.js";
import { appErr } from "./src/common/helpers/app-err.heplers.js";

const app = express();

app.use(cors());
// Phải parse JSON body trước mọi route cần req.body
app.use(express.json());

app.get("", (request, response) => {
    response.json("Hello world");
});

app.use("/api", rootRouter);
app.use(appErr);

const PORT = 3069;
app.listen(PORT, () => {
    console.log(`Server online at port: ${PORT}`);
});