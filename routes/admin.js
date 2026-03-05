const { Router } = require("express");
const adminRouter = Router();
console.log("Connected to")
const { adminModel } = require("../routes/db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("./config");
const { adminMiddleware } = require("../middleware/admin");

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

    const { tittle, description, imaheUrl, price  } = req.body;

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

adminRouter.put("/course", adminMiddleware, async function(req, res) {
     const adminId = req.userId;

    const { tittle, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title: tittle,
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

        res.json({
            message: "Course updated", 
            courseId: course._id
        })
    })    

adminRouter.get("/course/bulk",adminMiddleware, async function(req, res) {
    const adminId = req.userId;

     const courses = await courseModel.find({
        creatorId: adminId
    });

        res.json({
            message: "Course updated", 
            courses
        })
    })

    module.exports = {
        adminRouter: adminRouter
    }