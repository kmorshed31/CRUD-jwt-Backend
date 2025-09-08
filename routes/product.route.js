import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,

} from "../controllers/product.controller.js";

const router = express.Router();

// Base path is /api/products (set in index.js)
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);


export default router;


//We cannot pass json through node.js by default. We need a middleware
/*What is app.use?
It’s a method to mount middleware functions in your Express app.
Syntax:
app.use(middlewareFunction);
app.use("/path", middlewareFunction);
It tells Express: “whenever a request comes in (optionally to this path), run this function before moving on.”

app.use()

Defines middleware (functions that run on every request or certain paths).

It doesn’t care about GET or POST specifically (applies to all HTTP methods by default).

What express.json() actually does

It looks at the request’s body.

If the request has a JSON body, it parses it into req.body.

If the request has no body (like most GET requests), it just does nothing and moves on.

/*
/*In Express, the colon (:) is what tells Express:
👉 “This part of the URL is a parameter, capture its value into req.params.”
req.params always gives you an object where:
the keys are the names you wrote after : in the route
the values are the actual pieces of the URL

Return data (usually JSON) for programs (like your frontend React app) to consume.
They don’t serve a visual page, just information.
Example:

/api/products → returns a JSON array of products.
/api/users → returns JSON list of users.

this is just a naming convention


app.post() sets up a route that only accepts POST requests.

When you type a URL into the browser, the browser always sends a GET request.
req.body shows the request that the user asked for
creates a new document(document as in mongo)
the request might take some time. As a result we are passing it into an async await. We 
create and save a request body in product with product.create() 


To get the updated object

Add { new: true } (or { returnDocument: "after" } in newer versions):

const product = await Product.findByIdAndUpdate(id, req.body, { new: true });


Now product will be the updated document.otherwise its the older object that is returned
*/
