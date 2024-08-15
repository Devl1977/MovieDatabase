const UserModel = require('../models/User');

const getAllUsers = async(req, res) => {
    try {
        const allUsers = await UserModel.find();
      
            return res.status(200).json({
                status: 200,
                success: true,
                users: allUsers
            })
      
        
    } catch (error) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `No users found!`
        })
    }
}


const getOneUser = async(req, res) => {
    const { id } = req.params;

    try {
        const singleUser = await UserModel.findById(id);
        if(singleUser) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: `User found!`,
                user: singleUser
            })
        }

    } catch (error) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `User id: '${id}' does not exist!`
        })
    }
}

const createUser = async(req, res) => {
    const { name, email } = req.body;
    const newUser = new UserModel({
        name,
        email
    })

    try {
        const userToCreate = await newUser.save();
        return res.status(201).json({
            status: 200,
            success: true,
            user: userToCreate
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: `User name: '${name}' was not created!`
        })
    }
}


module.exports = {
    getAllUsers,
    getOneUser,
    createUser
}
