const User = require('../models/User');

module.exports.signup_get = function(req, res) {
    console.log("signup_get");
    console.log(req.body);
    res.send({express: 'Hello From Express'});
}
module.exports.signup_post = async function(req, res) {
    const { username, email, password } = req.body;
    try{
        const user = await User.create({ username, email, password });
        res.status(201).json({ user: user});
    }
    catch(err){
        console.log(err);
        res.send({error: 'User Registration Error'});    
    } 
}
module.exports.login_get = function(req, res) {
    console.log("login_get");
    console.log(req.body);

    res.send({express: 'Hello From Express'});
}
module.exports.login_post = function(req, res) {
    console.log("login_post");
    console.log(req.body);

    res.send({express: 'Hello From Express'});
}