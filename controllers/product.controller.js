import Product from "../models/product.model.js"

export const getProducts=  
    async (req,res)=>{

        try{

           
            const products = await Product.find({});//find all the products

            /*
             const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const resultProducts = products.slice(startIndex, endIndex);

            */
            res.status(200).json(products);
        }
        catch(err){
            res.status(500).json({message:err.message});
        }
}

export const getProductById= 
    async(req, res)=>
{
        try{
            const {id}=req.params;
            

            const product = await Product.findById(id);
            res.status(200).json(product);
        }
        catch(err){
            res.status(500).json({message:err.message});   
        }
}

export const createProduct=
    async (req, res)=>{
        try{
            const product = await Product.create(req.body); 
            res.status(200).json(product) ;
    
        }
        catch(err){
            res.status(500).json({message:err.message});
        }
    
}

export const deleteProduct= 
    async (req, res)=>{
        try{
            const {id} = req.params;
            const product= await Product.findByIdAndDelete(id)
            if (!product){
                return res.status(404).json({message: "Product not found"});
            }
    
            res.status(200).json("Successfully deleted");
        }catch(err){
            res.status(500).json({message:err.message});
        }
}

export const updateProduct= async(req,res)=>
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
