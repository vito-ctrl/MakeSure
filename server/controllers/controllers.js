const User = require('../models/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');

const JWT_SECRET = 'scretkey123'; // In production, use environment variables for this

exports.signup = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                status: 'fail',
                errors: errors.array()
            });
        }

        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({
                status: 'fails',
                message: 'User already exists'
            });
        }
        
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        
        // Create new user with role
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
            role: req.body.role || 'user' // Default to 'user' if no role provided
        });
        
        const token = jwt.sign(
            {
                _id: newUser._id,
                role: newUser.role
            }, 
            JWT_SECRET, 
            {
                expiresIn: '10d',
            }
        );
        
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            user: {
                _id: newUser._id,
                name: newUser.user,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch(error){
        res.status(500).json({
            status: 'error',
            message: 'Registration failed',
            error: error.message
        })
    }
}

exports.signin = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if(!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid password'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role
            }, 
            JWT_SECRET, 
            {
                expiresIn: '10d',
            }
        );
        
        res.status(200).json({
            status: 'success',
            token,
            message: 'Logged in successfully',
            user: {
                _id: user._id,
                name: user.user,
                email: user.email,
                role: user.role,
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Login failed',
            error: error.message
        });
    }
}

// Add a route to check authentication status
exports.checkAuth = async(req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'Not authenticated'
            });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded._id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            status: 'success',
            user: {
                _id: user._id,
                name: user.user,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid or expired token'
        });
    }
}