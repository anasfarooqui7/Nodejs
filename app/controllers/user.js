const userModel = require('../models/users');

async function handelGetAllUsers(req, res){
    const allUsersData = await userModel.findAll();
    return res.json(allUsersData);
    // return res.send("Anas Controller");
}

// get user data by id
async function handelGetUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await userModel.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

// update fun by id
async function handelUpdateUserById(req, res) {
    try {
        const userId = req.params.id;
        const body = req.body;

        // Validate request body
        if (!body.name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Update user
        const [updated] = await userModel.update({ name: body.name }, {
            where: { id: userId }
        });

        if (updated) {
            const updatedUser = await userModel.findOne({ where: { id: userId } });
            return res.status(200).json({ status: "Success", user: updatedUser });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


async function handelDeleteUserById(req, res) {
    try {
        const userId = req.params.id;

        // Attempt to delete the user
        const deleted = await userModel.destroy({
            where: { id: userId }
        });

        if (deleted) {
            return res.status(200).json({ status: "Success", message: "User deleted successfully" });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

// create new user
async function handleCreateNewUser(req, res) {
    try {
        const body = req.body;
        // console.log("create fun", req.body.name);
        // process.exit(0);

        if (!body || !body.name || !body.email) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const result = await userModel.create({
            name: body.name,
            email: body.email,
        });

        return res.status(201).json({ msg: "Success", id: result._id });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = {
    handelGetAllUsers,
    handelGetUserById,
    handelUpdateUserById,
    handelDeleteUserById,
    handleCreateNewUser
}