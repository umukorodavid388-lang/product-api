require("dotenv").config();
const express = require("express");
const app = express();


app.use(express.json());


products = [
    {id : '1', name : 'Bag', price : 100, category : 'Accessories', description : 'A stylish bag for everyday use', image : 'https://example.com/bag.jpg', stock : 50, rating : 4.5, reviews : ['Great bag!', 'Very durable.'], createdAt : new Date().toISOString(), updatedAt : new Date().toISOString()},
    {id : '2', name : 'Shoes', price : 200, category : 'Footwear', description : 'Comfortable shoes for daily wear', image : 'https://example.com/shoes.jpg', stock : 30, rating : 4.0, reviews : ['Nice shoes!', 'Good quality.'], createdAt : new Date().toISOString(), updatedAt : new Date().toISOString()},
    {id : '3', name : 'Jacket', price : 300, category : 'Clothing', description : 'Warm jacket for cold weather', image : 'https://example.com/jacket.jpg', stock : 20, rating : 4.8, reviews : ['Love this jacket!', 'Perfect for winter.'], createdAt : new Date().toISOString(), updatedAt : new Date().toISOString()},
    {id : '4', name : 'Pants', price : 400, category : 'Clothing', description : 'Stylish pants for any occasion', image : 'https://example.com/pants.jpg', stock : 25, rating : 4.2, reviews : ['Great fit!', 'Very comfortable.'], createdAt : new Date().toISOString(), updatedAt : new Date().toISOString()},
    {id : '5', name : 'Shirt', price : 500, category : 'Clothing', description : 'Classic shirt for formal events', image : 'https://example.com/shirt.jpg', stock : 15, rating : 4.6, reviews : ['Beautiful shirt!', 'Great fabric.'], createdAt : new Date().toISOString(), updatedAt : new Date().toISOString()}
]

app.get('/', (req, res) => {
    res.send("Welcome to Product API");
});


app.get('/products', (req, res) => {
    res.status(200).json(products);
});

app.get('/products/:id', (req,res) => {
    const id = req.params.id;
    const product = products.find(p => p.id === id);
    if(!product){
        res.status(404).json({message : "Product not found"});
    }else{
        res.status(200).json(product);
    }
});


app.get('/products/:id/price', (req,res) => {
    const id = req.params.id;
    const product = products.find(p => p.id === id);
    if (!product) {
        res.status(404).json({ message: "Product not found" });
    }
    else {
        res.status(200).json({ price: product.price });
    }
});


app.post('/products/add', (req, res) => {
    const {name, price, category, description, image, stock, rating, reviews} = req.body || {};
    if (!name || !price) {
        res.status(404).json({message : "Plese provide name and price"});
    }
    else{
        const newProduct = { id: String(products.length + 1), name, price, category, description, image, stock, rating, reviews, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        products.push(newProduct);
        res.status(201).json(newProduct);
    }
});


app.patch('/products/:id/update', (req, res) => {
    const product = req.params.id;
    const {name, price, category, description, image, stock, rating, reviews} = req.body || {};
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        res.status(404).json({ message: "Product not found" });
    } else {
        products[productIndex] = { ...products[productIndex], name, price, category, description, image, stock, rating, reviews, updatedAt: new Date().toISOString() };
        res.status(200).json(products[productIndex]);
    }
    Object.assign(product, req.body)
    res.status(200).json(product)
});

app.delete('/products/:id/delete', (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        res.status(404).json({ message: "Product not found" });
    } else {
        products.splice(productIndex, 1);
        res.status(200).json({ message: "Product deleted successfully" });
    }
});


app.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal server error" });
    next();
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})