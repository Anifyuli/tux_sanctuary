// Import require libs
import express from "express";
import expressEjsLayout from "express-ejs-layouts";
import methodOverride from "method-override";

// ExpressJS related
const app = express();
const port = 3000;
app.use(express.static("public"));

// Use imported libs
app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.use(methodOverride("_method"));

// Routing in here
app.get("/", (req, res) => {
  res.render("indeks", { layout: "partials/main" });
});

// Error handling
app.use((req, res) => {
  res.status(404);
  res.render("404-error", {
    title: "404 error : Page not found",
    layout: "partials/main",
  });
});

// Starting ExpresJS server service
app.listen(port, () => {
  console.log(`Tux Sanctuary started on http://localhost:${port}`);
});
