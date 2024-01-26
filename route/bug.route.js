const express = require('express')
const { bugModel } = require('../modal/bug.model')
const bugRouter = express.Router()

bugRouter.post('/bugs', async(req, res)=> {
    try {
        const bug = new bugModel({
            ...req.body,
            created_at: new Date().toString(),
            upadated_at: new Date().toString()
        })
        await bug.save()
        res.status(200).send('bug has been added to the list !')
    } catch (error) {
        res.status(400).send({"message": error})
    }
})

bugRouter.get('/bugs', async(req, res)=> {
    try {
        const bugs = await bugModel.find()
        res.status(200).send({"message": 'here is all bugs', bugs})
    } catch (error) {
        res.send({"message": error})
    }
})

bugRouter.delete('/bugs/:id', async(req, res)=> {
    const {id} = req.params
    try {
        await bugModel.findByIdAndDelete({_id: id})
        res.status(200).send({"message": `bug with id ${id} has been deleted`})
    } catch (error) {
        res.status(400).send({"message": error})
    }
})

module.exports = {
    bugRouter
}