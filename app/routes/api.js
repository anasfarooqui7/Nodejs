const express = require('express');
const app = express();
const router = express.Router();

// require files
const userController = require('../controllers/user');
const logMiddleware = require("../middleware");

router.get('/', logMiddleware.logReqRes('log.txt'), userController.handelGetAllUsers);
router.post('/:id', userController.handelGetUserById);
router.patch('/update/:id', userController.handelUpdateUserById)
router.delete('/delete/:id', userController.handelDeleteUserById);
router.post('/add/create', userController.handleCreateNewUser);

module.exports = router;