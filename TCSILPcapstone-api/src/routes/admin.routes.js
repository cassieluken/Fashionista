const router = require('express').Router();
const ProductModel = require('../db/product.schema');
const UserModel = require('../db/user.schema');

//***************** PRODUCT CRUD **********************//

router.post('/createProduct',async(req,res)=>{
    const data = req.body;
    const product = await new ProductModel(data).save();
    res.json(product);
});
router.delete('/deleteProduct/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const product = await ProductModel.findOne({_id: id}).then(product =>{
        if(product){
            product.deleteOne().then(res.json(`Successful deletion of ${product}`))
        }
        else{
            res.status(404).send();
        } 
    })
});
router.get('/getProducts',async(req,res)=>{
    //const data = req.body;
    const products = await ProductModel.find();
    res.json(products);
});
router.put('/updateProduct',async(req,res)=>{
    const data = req.body;
    //console.log(data);
    const product = await ProductModel.findByIdAndUpdate({_id: data._id},data);
    res.json(product);
})

//***************** USER CRUD **********************//
router.post('/createUser',async(req,res)=>{
    const data = req.body;
    const user = await new UserModel(data).save();
    res.json(user);
});
router.get('/getAllUsers',async(req,res)=>{
    //const data = req.body;
    const users = await UserModel.find();
    res.json(users);
});
router.delete('/deleteUser/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const user = await UserModel.findOne({_id: id}).then(user =>{
        if(user){
            user.deleteOne().then(res.json(`Successful deletion of ${user}`))
        }
        else{
            res.status(404).send();
        } 
    })
});
router.put('/updateUser',async(req,res)=>{
    const data = req.body;
    //console.log(data);
    const user = await UserModel.findByIdAndUpdate({_id: data._id},data);
    res.json(user);
    
})

module.exports = router;