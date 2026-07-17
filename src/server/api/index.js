import { Hono } from "hono";
import pdfApi from "./pdf";
import notesApi from "./notes";

const app = new Hono()

app.route('/', pdfApi)
app.route('/', notesApi)

export default app