const express = require('express')
const app = express()
const path = require('path')
const userModel = require('../miniProject1/models/user')
const postModel = require('../miniProject1/models/post')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require("crypto")
const upload = require("../config/Multers/multerConfig")
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname,'../public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// route for form creation page for rendering file
app.get('/',function(req,res){
    res.render("index")
    
})

// picture upload karne ke liye route banana with the help of "Multer"

app.get("/profile/upload",function(req,res){
    res.render("profileUpload")
})

app.post('/upload', isLoggedIn, upload.single("image"), async function(req,res){
    console.log(req.file);
    let user = await userModel.findOne({email:req.user.email})
    console.log("here");
    
    user.profilePic = req.file.filename;
    await user.save()
    res.redirect("/profile")
})
// route for registered data
app.post('/register', async function(req,res){
    let {username,email,name,age,password} = req.body
    // check if user already exist with the same email
    let user = await userModel.findOne({email})
    if(user){
        return res.status(500).send("user already registered")
    }

    bcrypt.genSalt(10,(err,salt)=>{
        console.log(salt);
        bcrypt.hash(password,salt,async (err,hash)=>{
            let user = await userModel.create({
                username,
                email,
                name,
                age,
                password:hash
            })

           let token =  jwt.sign({email:email,userid:user._id},process.env.JWT_SECRET||"shhhhh")
           res.cookie("token",token)
           res.send("registered")
        })
        
    })
 
})


// route for login set up page
app.get('/login',function(req,res){
    res.render("login")
})

app.post('/login',async function(req,res){
    let{email,password} = req.body
    
    let user = await userModel.findOne({email})
    if(!user){
        return res.status(500).send("something went wrong")
    }

    bcrypt.compare(password, user.password, function(err,result){
        
        if(result){
            let token =  jwt.sign({email:email,userid:user._id},process.env.JWT_SECRET||"shhhhh")
            res.cookie("token",token)                                    
            
            return res.status(200).redirect("/profile")
        }else{
            res.redirect('/login')
        }
    })

    })
// make the route for logout page
app.get('/logout', function(req,res){
    res.cookie("token","")
    res.redirect('/login')
})


// route for profile
app.get('/profile', isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email:req.user.email}).populate("posts")    
    res.render('profile',{user})
    
})
// like route
app.get('/Like/:id',isLoggedIn, async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user")
    if(post.likes.indexOf(req.user.userid)=== -1){
        post.likes.push(req.user.userid)
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1)
    }
    await post.save()
    res.redirect("/profile")


}) 

//edit route
app.get('/Edit/:id',isLoggedIn,async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id}).populate("user")
    res.render("edit",{post})
})
 
// update route
app.post('/update/:id',isLoggedIn, async function(req,res){
    let post = await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    res.redirect('/profile')
})



app.post('/post', isLoggedIn,async function(req,res){       
    let user = await userModel.findOne({email:req.user.email})
   let{content} = req.body
   let post = await postModel.create({
        user:user._id,
        content:content
    })

    user.posts.push(post._id)
    await user.save()
    res.redirect('/profile')
})                                                            


// middleware
function isLoggedIn(req,res,next){
    if(!req.cookies.token||req.cookies.token === ""){
        return res.redirect("/login")
    }else{
        let data = jwt.verify(req.cookies.token,process.env.JWT_SECRET||"shhhhh")
        req.user = data
    }
    next()    
}

app.listen( process.env.PORT||3000,function(){
    console.log("sever is running");
    
})