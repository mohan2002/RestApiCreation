const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')

//Getting all
router.get('/',async(req,res) => {
    try{
        const profiles = await Profile.find()
        res.json(profiles)
    }
    catch(error){
        res.status(500).json({message:error.message}) //500 means the status that indicates error 
    }
})

//Getting one
router.get('/:id',getProfile,(req,res) => {
    res.json(res.profile)
})


//Creating one 
router.post('/',async(req,res) => {
    const profile = new Profile({
        Username:req.body.Username,
        Name:req.body.Name,
        Age:req.body.Age,
        Gender:req.body.Gender
    })
    try{
        const newprofile = await profile.save()
        res.status(201).json(newprofile) //201 means successfully created and 200 means every request is succesful
    }
    catch(err){
        res.status(400).json({message:err.message}) // 400 means if user gives bad data and to send a forbidden error because the data sent by user was wrong not the case with server
    }
})


//Updating one
router.patch('/:id',getProfile,async(req,res) => {  //same as put but patch allows us to update only single field which put does not gives us.
    if(req.body.Username!=null){
        res.profile.Username = req.body.Username
    }
    if(req.body.Name!=null){
        res.profile.Name = req.body.Name
    }
    if(req.body.Age != null){
        res.profile.Age = req.body.Age
    }

    try{
        const profileupdate = await res.profile.save()
        res.json(profileupdate)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})


//Deleting one
router.delete('/:id',getProfile,async(req,res) => {
    try{
        await res.profile.remove()
        res.json({message:'Deleted Profile'})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

async function getProfile(req,res,next){
    let profiles
    try{
        profiles = await Profile.findById(req.params.id)
        if(profiles == null){
            return res.status(404).json({message:"Cannot find Profile"})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
    res.profile = profiles
    next()
}

module.exports = router