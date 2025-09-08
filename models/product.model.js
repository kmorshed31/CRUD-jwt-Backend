import mongoose from 'mongoose'
/*a Schema takes two things:
1. Definition object → describes fields (their types, required, defaults, etc).
2. Options object → configures how the whole schema behaves*/
const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please provide a name for this product."],
        },
        quantity:{
            type : Number,
            required: true,
            default: 0
        },
        price:{
            type: Number,
            required: false,
            default: 0
        }
    }

);

const Product= mongoose.model('Product', productSchema);

export default Product;


/*
Schema = the blueprint. It only describes the shape and rules of the data — but you can’t directly use it to query or save.
Model = like a class built from that blueprint. It’s what you actually use in code. It comes with methods

model takes in three params, name, schema and collection name (3rd one is optional)
*/







/*a Schema takes two things:
1. Definition object → describes fields (their types, required, defaults, etc).
2. Options object → configures how the whole schema behaves

In Mongoose, .model() is the step that turns your Schema (the blueprint) into a Model (the tool you actually use).

Analogy

Schema = the blueprint of a house (it says: 3 rooms, 2 windows, a door).
Model = the construction company that uses that blueprint to build real houses, and also lets you query or update them later.
Documents = the actual houses built.
What .model() does
It binds a name (like "User") to a schema.
It tells Mongoose: “create a collection for this schema (pluralized, like users) and give me a class with methods to interact with it.”
That class has methods like:
.find(), .findById()
.create()
.updateOne()
.deleteOne()
and more.
*/