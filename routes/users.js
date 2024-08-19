const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/',async (req,res) => { //get all
    try {
        console.log("fetching all users")
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get('/:id',getUser, (req,res) => {  // get one
    res.send(res.user)
})

router.post('/',async (req,res) => {  //add one
    const myUser = new User({
        name : req.body.name,
        age: req.body.age,
        gender: req.body.gender
    })
    try {
        const newUser = await myUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.patch('/:id',getUser,async (req,res) => {  //edit one
    if(req.body.name != null)
        res.user.name = req.body.name
    if(req.body.age != null)
        res.user.age = req.body.age
    if(req.body.gender != null)
        res.user.gender = req.body.gender

    try {
        await res.user.save()
        res.status(201).json(res.user)
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

router.delete('/:id',getUser ,async (req,res) => {  //delete one
    try {
        await res.user.deleteOne()
        res.status(200).json({message:"User removed"})
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

async function getUser(req,res,next) {                 //middleware
    let user
    try {
        user = await User.findById(req.params.id)
        if(user == null)
            return res.status(404).json({message : "Cannot find User"})
    } catch (err) {
        return res.status(500).json({message: err.message})        
    }
    res.user = user
    next()
}

module.exports = router