const express=require('express');
const app=express();
const db=require('mongoose')
const bp=require('body-parser');
const { json } = require('body-parser');


app.use(bp.urlencoded({extended:false}))
app.use(bp.json());
db.connect('mongodb+srv://jenia_vine:cM4X2Y0eUo0HGLHV@cluster0.5d81gqr.mongodb.net/svShopProj')
app.use(express.static('client'))
app.use(express.static('public'));


const userSchema=db.Schema({
    firstName:String,
    password:String,
    email:String
})
const userList=db.model('users',userSchema)

const productSchema=db.Schema({
    name:String,
    price:Number,
    picture: String // new field for image URL
})
const productList=db.model('products',productSchema)

const orderSchema=db.Schema({
    email:String,
    productsName:String
})
const orderList=db.model('orders',orderSchema)

let products=[{
    name:'Milk',
    price:10,
    picture:'milk.jpg'
},{
    name:'Beef',
    price:90,
    picture:'beef.jpg'
},{
    name:'Bread',
    price:16,
    picture:'bread.jpg'
},{
    name:'Rice',
    price:24,
    picture:'rice.webp'
},{
    name:'Apples',
    price:12,
    picture:'apples.jpg'
},{
    name:'Salmon',
    price:85,
    picture:'salmon.jpg'
},{
    name:'Bananas',
    price:18,
    picture:'bananas.jpg'
}]
const add=async()=>{
    await productList.insertMany(products)
}
add()

const delete1=async()=>{
    await productList.deleteMany();
}
delete1()

app.get('/signin',(req,res)=>{
   res.sendFile(__dirname+'/client/signin.html')
})

app.post('/signin',(req,res)=>{
const find=async()=>{
let result5= await userList.findOne({password:req.body.password,email:req.body.email});
if(result5 == null){
    res.json({message:'error'})
    console.log('error')
}
if(result5 != null){
    res.json({message:'ok'})
    console.log('ok')
}
}    
find()
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/client/signup.html')
})
app.get('/products',(req,res)=>{
    res.sendFile(__dirname+'/client/products.html')
})
app.post('/products',(req,res)=>{
    const sortBy = req.body.sort || 'name'; // Default to sorting by name
    const sortOptions = { [sortBy]: 1 }; // Set sort options based on selected value
  
    const findProd=async()=>{
        let answer= await productList.find()
        res.json(answer)
    }
    findProd()
})
app.post('/signup',(req,res)=>{
    let temp={
        firstName : req.body.firstName,
        password : req.body.password,
        email : req.body.email
    }
    const check=async()=>{
     let answer  =   await userList.findOne({email:req.body.email})
     if(answer==null){
         userList.insertMany(temp)
         res.sendFile(__dirname+'/client/signin.html')
        }
        else{
        res.json({massage:'error'})
     }
    }
    check()

})
app.get('/buy',(req,res)=>{
    res.sendFile(__dirname+'/client/buy.html')
})

app.post('/buy',  (req, res) => {
    const addOrder=async()=>{
        try {

            await orderList.insertMany({email:req.body.email,productsName:req.body.productsName})
            res.json({ message: 'success' });
          } catch (error) {
            console.log(error);
            res.json({ message: 'error' });
          }
        }
        addOrder()

  });
  

app.listen('3700',()=>{console.log('3700 in the air')})