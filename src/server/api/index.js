import { Hono } from "hono";
import pdfApi from "./pdf";
import notesApi from "./notes";
import authApi from "./auth";

const app = new Hono()

app.route('/', pdfApi)
app.route('/', notesApi)
app.route('/', authApi)

export default app