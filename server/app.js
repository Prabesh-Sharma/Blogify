const express = require('express');
const { connectDatabase } = require('../database/database');
const {Blog}= require('../model/blogmodel');

const app = express();

app.use(express.static("public"))
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended:false}))

connectDatabase()


app.get('/', (req, res) => {
    res.render('home')
});

app.get('/about',(req,res)=>
{
    res.render('about')
}
);

app.post('/createBlog', async (req, res) => {
    
        await Blog.create({
            title: req.body.title,
            subTitle: req.body.subTitle,
            description: req.body.description,
        });

        res.status(201).json({
            message: 'Blog successfully created',
        });

});

app.get("/blogs",async(req,res)=>
{
    const blogs= await Blog.find();
    
    if(blogs.length==0)
        {
            res.json({
                status: '404',
                message:'no blogs found'
            })
        }

    else{res.json({
        status: "200",
        message: "blogs fetched ",
        data: blogs
    })}
});

app.get("/blogs/:id",async(req,res)=>
{
    const blog=await Blog.findById(req.params.id);

    res.json({
        message: "blog fetched",
        data: blog
    })
});
    
app.listen(3000, () => {
    console.log('Node server has started on port 3000');
});

