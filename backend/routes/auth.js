const express = require('express');
const router = express.Router();
const ip = require('ip');
const UserModel = require('../models/User');


router.post('/createUser', async (req, res) => {
    let success;
    try {  
        // const ipAddress = req.clientIP;
        const ipAddress = req.clientIP || ip.address();
        let user = await UserModel.findOne({ email: req.query.email });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "An user with this email already exists." })
        } else {
            success = true;
            user = await UserModel.create({
                email: req.query.email,
                username: req.query.username,
                password: req.query.password, 
                ipAddress: ipAddress,
                searchItiHistory: [],
                searchdestination:[req.query.searchDest], 
                // UserType:req.query.UserType,
                
            });
            res.json({ success })
        }
    } catch (error) {
        success = false;
        console.log(error.message);
        res.status(500).json({ success, msg: "Internal Server Error" })
    }
});

router.get('/googleUser', async (req, res) => {
  try {
    const { email, username,password,ipAddress } = req.query;
    console.log('Received request for googleUser:', { email, username,password,ipAddress });

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        email,
        username,
        password,
        ipAddress,
        
      });

      // Return 201 Created status for a new registration
      return res.status(201).json({ success: true, username: user.username });
    }

    res.json({ success: true, username: user.username });
  } catch (error) {
    console.error('Error checking or creating user:', error);
    res.status(500).json({ success: false, msg: 'ServerError' });
  }
});


router.post('/googleLogin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists with the provided Google credentials
    const user = await UserModel.findOne({ username, password });

    if (user) {
      // User exists, perform your login logic here if needed
      res.json({ success: true, user });
    } else {
      // User does not exist, you can create an account for them or handle it accordingly
      res.status(400).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
});

router.post('/Login', async (req, res) => {

    const{username,password}=req.body;

    try{
        let user= await UserModel.findOne({username});
       
        if(user && user.password === password){
            // user.lastIpAddress = req.query.ipAddress;
            await user.save();

            return res.json({success:true ,user});
        }else{
            return res.status(400).json({success:false,error:'Enter valid credentials'})
        }
    }
    catch(error){
        console.log('Error during Login' ,error);
        return res.status(500).json({success:false ,msg:'Internam Server Error'});
    }
});



router.post('/Logout' ,async(req,res)=>{

    try{
    const {username}=req.body;

    const user = await User.findOne({username});

    await user.save();
    res.json({success:true});
    }catch(error){
       console.error('Error during logout',error);
       res.status(500).json({success:false,error:'Internam server error'});
    }
});

   
module.exports = router;
