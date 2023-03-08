const Todo = require('../models/Todo')

module.exports = {
    getDone: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsCompleted = await Todo.countDocuments({userId:req.user.id,completed: true})
            res.render('accomplishments.ejs', {todos: todoItems, done: itemsCompleted, user: req.user})
        }catch(err){
            console.log(err)
        }
    }
}