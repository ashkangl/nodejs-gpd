import express from 'express';
import Post from '../model/post.js';
const router = express.Router();

router.post('/post',async(req,res)=>{
    const file = req.body;
    var post = new Post(file);
    post.save()
    .then(post => console.log(post))
    .catch(err => console.log(err));
})

router.get('/fetchall',async(req,res)=>{
    try {
        const post = await Post.find().sort({id:-1});
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

router.get('/fetchbyname/:name',async(req,res)=>{
    try {
        const name = req.params;
        const post = await Post.findOne(name);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message : error.message });
    }
})

router.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await Post.findByIdAndDelete(id);
    res.json({message:'Post Deleted Succesfully !'});
})



export default router;