const { Router } = require("express");
const adminRouter = Router();
console.log("Connected to")
const { adminModel } = require("../routes/db");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "123abc"

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

adminRouter.post("/course", function(req, res) {
        res.json({
            message: "signup endpoint"
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