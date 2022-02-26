const router = require('express').Router()
const Parent = require('../models/Parent')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')