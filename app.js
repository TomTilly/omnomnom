const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 7777;
require('dotenv').config({ path: 'variables.env' });