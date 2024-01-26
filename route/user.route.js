const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const { userModal } = require('../modal/user.modal')
const jwt = require('jsonwebtoken')

userRouter.post('/register', async(req, res)=> {
    const {password} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(hash){
                const user = new userModal({
                    ...req.body,
                    password: hash
                })
                await user.save()
                res.status(200).send({"message": "user has been registered !"})
            }
        })
    } catch (error) {
        res.status(400).send({"msg": error})
    }
})

userRouter.post('/login', async(req, res)=> {
    const {email, password} = req.body
    try {
        const user = await userModal.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token = jwt.sign({userID: user._id}, "coding")
                    res.status(200).send({"msg": "user logged in successfully", "token": token})
                }
                else{
                    res.status(200).send({"msg": "invalid credentials"})
                }
            })
        }
    } catch (error) {
        res.send({"message": error})
    }
})

module.exports = {
    userRouter
}