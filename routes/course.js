const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = request("../db")
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function(req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        course
    })
    
    res.json({
        message: "You have successfully bought the course"
    })
})
 
courseRouter.get("/preview", async function(req, res) {

    const courses = await courseModel.find({});

    res.json({
       course
    })
})  

module.exports = {
    courseRouter: courseRouter
}