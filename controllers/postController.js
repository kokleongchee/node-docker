const Post = require("../models/postModel")

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()

        res.status(200).json({
            status: "Success",
            results: posts.length,
            data: {
                posts,
            },
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail",
        })
    }
}

exports.getOnePost = async(req, res, next) => {
    try {
        const posts = await Post.findById(req.params.id)

        res.status(200).json({
            status: "Success",
            data: {
                posts,
            },
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail",
        })
    }
}

exports.createPost = async(req, res, next) => {
    try {
        const posts = await Post.create(req.body)

        res.status(200).json({
            status: "Success",
            data: {
                posts,
            },
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail",
            data: {
                e,
            }
        })
    }
}

exports.updatePost = async(req, res, next) => {
    try {
        const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            status: "Success",
            data: {
                posts,
            },
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: "Fail",
        })
    }
}

exports.deletePost = async(req, res, next) => {
    try {
        const posts = await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "Success",
        })
    } catch (e) {
        res.status(400).json({
            status: "Fail",
        })
    }
}
