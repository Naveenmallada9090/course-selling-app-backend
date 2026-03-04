const { Router } = require("express");
const adminRouter = Router();
console.log("Connected to")
const { adminModel } = require("../routes/db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");

adminRouter.post("/signup", async function(req, res) {
       const { email, password, firstName, lastName } = req.body;
        
        
        await adminModel.create({
            email: email,
            password: password, 
            firstName: firstName,
            lastName: lastName 
        })
        
        res.json({
            message: "signup succeeded"
        })
    })

adminRouter.post("/signin", async function(req, res) {
     const {email, password} = req.body;

        const admin = await adminModel.findOne({
            email: email,
            password: password
        });

        if (admin) {
            const token = jwt.sign({
                id: admin._id
            }, JWT_ADMIN_PASSWORD);
            
        
        res.json({
            token: token
        })
    } else{
        res.status(403).json({
            message: "incorrect credentials"
        }) 
    }   
    res.json({
            message: "signup endpoint"  
        }) 
    })

adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const {tittle, description, imaheUrl, price} = req.body;

    const course = await courseModel.create({
        title: tittle,
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })

        res.json({
            message: "Course created",
            courseId: course._id
        })
    })    

adminRouter.put("/course", function(req, res) {
        res.json({
            message: "signup endpoint"
        })
    })    

adminRouter.get("/course/bulk", function(req, res) {
        res.json({
            message: "signup endpoint"
        })
    })    

    module.exports = {
        adminRouter: adminRouter
    }