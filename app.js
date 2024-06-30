// Import require libs
import express from "express";
import expressEjsLayout from "express-ejs-layouts";
import methodOverride from "method-override";
import { marked } from "marked";

// Import local things
import "./utils/dbconn.js";
import { Blog } from "./models/blogs.js";

// ExpressJS related
const app = express();
const port = 3000;
app.use(express.static("public"));

// Use imported libs
app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.use(methodOverride("_method"));

// Routing in here
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us", layout: "partials/main" });
});

app.get("/blog", (req, res) => {
  res.render("blog", { title: "Blog", layout: "partials/main" });
});

app.get("/blog-lists", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("blog-lists", { title: "Blog", blogs, layout: "partials/main" });
});

app.get('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    const content = blog.content.toString(); // Pastikan content adalah string
    const contentHtml = marked(content); // Konversi Markdown menjadi HTML
    res.render('blog-detail', { title: blog.title, blog, contentHtml, layout: 'partials/main' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get("/add-blog", (req, res) => {
  res.render("add-blog", { title: "New Blog", layout: "partials/main" });
});

app.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createDate: -1 }).limit(3); // Mengambil 3 blog terbaru
    res.render("index", { title: "Blog", blogs, layout: "partials/main" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
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
