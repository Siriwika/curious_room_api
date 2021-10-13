const model = require('../models');
const User = model.User;
module.exports = { 
    test: async (req, res) => {
        const user  = await User.findAll()
        console.log("test");
        res.json({user:user[0].name});
      },
}