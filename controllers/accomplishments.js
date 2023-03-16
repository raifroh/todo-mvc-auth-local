const Todo = require('../models/Todo')

module.exports = {
    getDone: async (req,res)=>{
        //console.log(req.query)
        try{
            const completedTodos = await Todo.find({userId:req.user.id, completed: true})
            const itemsCompleted = await Todo.countDocuments({userId:req.user.id,completed: true})
            
            //get an array of unique categories made by the user
            const allCategories = await Todo.find({userId:req.user.id}, "category")
            const categoryArray = await allCategories.map(doc => doc['category'])
            const uniqueCategories = [...new Set(categoryArray)]

            //get the value out of the category drop down form
            const selectedCategory = req.query['category-dropdown']

            //get all docs that user has completed and in the selected category
            const filteredTodos = await Todo.find({userId: req.user.id, completed: true, category: selectedCategory})
            const filteredCompleted = await Todo.countDocuments({userId: req.user.id, completed: true, category: selectedCategory})

            //if category select value is falsy, load all categories otherwise load selected one
            if(!selectedCategory){
                res.render('accomplishments.ejs', {todos: completedTodos, done: itemsCompleted, user: req.user, categoryOptions: uniqueCategories})
            }else{
                res.render('accomplishments.ejs', {todos: filteredTodos, done: filteredCompleted, user: req.user, categoryOptions: uniqueCategories})
            }
        }catch(err){
            console.log(err)
        }
    }
}