const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const itemsCompleted = await Todo.countDocuments({userId:req.user.id,completed: true})
            //find all the docs made by the user and get the category key value pair
            const allCategories = await Todo.find({userId:req.user.id}, "category")
            //put the values of the category property into an array
            const categoryArray = await allCategories.map(doc => doc['category'])
            //get rid of duplicate values and put it into an array
            const uniqueCategories = [...new Set(categoryArray)]

            //find all the due dates created by the user
            const dueDates = await Todo.find( {userId:req.user.id }, "dueDate")

            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, done: itemsCompleted, user: req.user, categoryOptions: uniqueCategories})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, category: req.body.category, dueDate: req.body.dueDate})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    