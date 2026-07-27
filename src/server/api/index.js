import { Hono } from "hono";
import pdfApi from "./pdf";
import authApi from "./auth";
import notebooksApi from "./notebooks";

const app = new Hono()

app.route('/', pdfApi)
app.route('/', authApi)
app.route('/', notebooksApi)

export default app