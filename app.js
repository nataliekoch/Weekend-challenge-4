var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var pg =require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/ weekend Challenge 4';
