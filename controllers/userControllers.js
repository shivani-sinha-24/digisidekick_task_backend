import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const saltRounds = 10;

export default {

    async register (req,res) {

        const { name, email, password} = req.body;
        const userFound = await  User.findOne({ email: email } );
        if(userFound){
            res.send({ message: "User already exists" })
        }else{
            // generate token
            const token = jwt.sign(
                { 
                name: name,
                email: email,
                password: password
                }, 
                'shhhhh'
            );
            // bcrypt password hash
            bcrypt.hash(password, saltRounds, function (err, hash) {
                const user = new User({
                    name: name,
                    email: email,
                    password: hash
                });
                user.save();
                res.send({message: "User registered successfully", user: token})
            })
        }
    },

    async login (req,res) {
        try {
            const { email, password } = req.body;
        //check for existing user
        const userFound = await User.findOne({ email: email });
        if(userFound){
            //generate token
            const token = jwt.sign(
            { 
            name: userFound.name,
            email: userFound.email,
            password: userFound.password
            }, 
            'shhhhh'
            );
            // compare hash password
            bcrypt.compare(password, userFound.password, function (err, result) {
            result
                ? 
                res.status(200).send({message: "User loggedin successfully",user: token,})
                : 
                res.status(400).send({ err: "password is incorrect" });
            })
        }else{ 
            // no user found
            res.status(400).send({ err: "User not found. Create a new account" })
        }
            } catch (error) {
                return res.status(400).send(error)
            }
    },

    async updateUser (req,res) {
    try {
        let request = req.body
        const { name, email, id } = req.body;
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.json(reply.failed("User not found!!"))
        }else{
            const updateUser = await User.findOneAndUpdate({ _id: id }, { name:name,email:email }, { new: true })
            let users = await User.find();
            return res.status(200).send({ user: users ,message: 'User updated successfully'})
        }

        } catch (err) {
            return res.status(400).send({err:'Something went wrong'})
        }
    },

    async deleteUser (req,res) {
        try {
            let id = req.params.id
            const user = await User.findByIdAndRemove(id)
            if (!user) {
                return res.status(404).send({ message: "User not found" })
            }
            const users = await User.find()
            return res.status(200).send({ message: "User deleted successfully",user:users })
        } catch (err) {
            return res.status(400).send(err)
        }
    },

    async getUsers (req,res) {
        try {
            let user = await User.find();
            return res.status(200).send({ user: user })
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    async getUser (req,res) {
        try {
        const token = req.body.token;
        if(token){
            const decode = jwt.decode(token)
            const user = await User.findOne({email:decode.email})
            if (user) {
                res?.status(200).send({user});
            }
        }
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    async createUser (req,res) {
        try {
        const {name,email} = req.body
        const userFound = await User.findOne({name:name,email:email})
        if(userFound){
            res.status(500).send({ message: "User already exists" })
        }else{
            const user = new User({
                name: name,
                email: email,
            });
            user.save();
            const users = await User.find();
            res.status(200).send({message: "User created successfully", user: users})
        }    
        } catch (error) {
            
        }
    }

}