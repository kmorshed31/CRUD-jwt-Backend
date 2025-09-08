import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";
import loginRoutes from "./routes/login.route.js";
import dotenv from "dotenv";
import {authenticateToken} from "./other-functions/authenticateToken.js"
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

/** */
const app = express();

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------- Swagger (OpenAPI) ----------
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "My API", version: "1.0.0" },
    servers: [{ url: "http://localhost:" + (process.env.PORT || 5000) }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }], // apply by default
  },
  apis: ["./routes/*.js"], // add JSDoc comments in your route files
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// routes
app.use("/login", loginRoutes)
app.use("/api/products", authenticateToken, productRoutes);


// health check
app.get("/", (req, res) => res.send("API is up"));

// ---------- 404 + error handler ----------
//app.use((req, res) => res.status(404).json({ message: "Not found" }));
//app.use((err, req, res, next) => {
  //console.error(err);
  //res.status(500).json({ message: "Internal error" });
//});


mongoose.connect("mongodb+srv://morshedshadeen:2WlW0oxjfjKK89b8@cluster0.gtkcucc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
}).catch((err)=>{
    console.log("Action failed", err);
})
// This is to make sure that we 
    //are connected to the database before starting the server

//Model.create() → saves the document into the database you connected with mongoose.connect(...).
//first npm i mongoose before using mongoose
//I can write a custom collection name aftermongodb.net/



/**app.get('/api/products', async (req,res)=>{

    try{
        const products = await Product.find({});//find all the products
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
)

app.get('/api/product/:id', async(req, res)=>
{
    try{
        const {id}=req.params;

        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message:err.message});   
    }
})

app.post('/api/products', async (req, res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product) ;

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

app.delete('/api/product/:id', async(req,res)=>
{
    try{
        const {id} = req.params;
        const product= await Product.findByIdAndDelete(id)
        if (!product){
            return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json("Successfully deleted");
    }catch(err){
        res.status(500).json({message:err.message});
    }})

app.put('/api/product/:id', async(req,res)=>
{
    try{
        const{id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product){
            return res.status(404).json({message: "Product not found"});
        }
        const updatedproduct = await Product.findById(id);

        res.status(200).json(updatedproduct);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
)


 */