import express from 'express'
import multer from 'multer';
import userControllers from '../controllers/userControllers.js';
import bodyParser from 'body-parser'

const Router = express.Router();
Router.use(bodyParser.json());

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'images');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
   }
});

const upload = multer({ storage: storage })

Router.get('/get-users',userControllers.getUsers)
Router.post('/get-userDetail',userControllers.getUser)
Router.post('/register',userControllers.register)
Router.post('/login',userControllers.login)
Router.put('/update-user',userControllers.updateUser)
Router.delete('/delete-user/:id',userControllers.deleteUser)
Router.post('/create-user', userControllers.createUser)

export default Router;