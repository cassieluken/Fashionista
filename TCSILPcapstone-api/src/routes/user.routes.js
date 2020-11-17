const router = require('express').Router();
const UserModel = require('../db/user.schema');
const CartModel = require('../db/cart.schema');
const WishlistModel = require('../db/wishlist.schema');



//CART CRUD
router.post('/addToCart', async(req,res)=>{
    const data= req.body;
    console.log("ADDTOCART")
    console.log(data);
    const user = await new CartModel(data).save();
});
router.get('/getCart',async(req,res)=>{
    //const data = req.body;
    const products = await CartModel.find();
    res.json(products);
});
router.delete('/deleteProductCart/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const product = await CartModel.findOne({_id: id}).then(product =>{
        if(product){
            product.deleteOne().then(res.json(`Successful deletion of ${product}`))
        }
        else{
            res.status(404).send();
        } 
    })
});
router.put('/updateQuantity',async(req,res)=>{
    const data = req.body;
    //console.log(data);
    const product = await CartModel.findByIdAndUpdate({_id: data._id},data);
    res.json(product);
    //not working yet
})


//WISHLIST CRUD
router.post('/addToWishlist', async(req,res)=>{
    const data= req.body;
    const user = await new WishlistModel(data).save();
});
router.delete('/deleteProductWish/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const product = await WishlistModel.findOne({_id: id}).then(product =>{
        if(product){
            product.deleteOne().then(res.json(`Successful deletion of ${product}`))
        }
        else{
            res.status(404).send();
        } 
    })
});
router.get('/getWishlist',async(req,res)=>{
    //const data = req.body;
    const products = await WishlistModel.find();
    res.json(products);
});




// LOGIN CRUD
router.post('/register',async(req,res)=>{
    const data = req.body;
    const user = await new UserModel(data).save();
    res.json(user);
    //JWT res.json(JWT)
});
router.post('/login',async(req,res)=>{
    const data = req.body;
    console.log(data);
    // if(data.name === 'admin'){
    //     res.json('true');
    // }
    // else{
    //     res.status(401).json('error');
    // }
    const user = await UserModel.findOne({name:data.name,pw:data.pw});
    console.log(user);
    if(!user){
        res.status(401).json('error');
    }
    else{
        res.json(user);
        //res.json(JWT)
    }
});

module.exports = router;