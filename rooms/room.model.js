/**
 * Room Model for DynamoDB.
 * The room is a critical object for the application, much of
 * what the user wants revolves around doing it *somewhere*. 
 * The object is currently a near clone of the MAUI API with 
 * floors added. 
 * 
 * To Do:
 *  - Slim down attributes! 
 * Assign semantic meaning to departments
 * Align rooms reservable status with kelly
 */

// Load up our env
require('dotenv').config();

// AWS database + model validation
const dynamo = require('dynamodb');
const Joi    = require('joi');

// Utility to create our database name
const createTableName = require('../utils/index').createTableName;
const name            = process.env.APP_NAME;
const env             = process.env.EENV;
const table           = 'rooms';

// DynamoDB model
var Room = dynamo.define('Room', {
  hashKey: 'roomNumber',
  schema: {
    buildingName   : Joi.string().required(),
    buildingCode   : Joi.string().required(),
    roomNumber     : Joi.string().required(),
    roomName       : Joi.string().allow(null).required(),
    regionList     : Joi.array(),
    featureList    : Joi.array(),
    maxOccupancy   : Joi.number().integer(),
    rmType         : Joi.string().allow(null).required(),
    acadOrgUnitName: Joi.number().integer().allow(null),
    roomCategory   : Joi.string().allow(null),
    roomTypeGroup  : Joi.string().allow(null).required(),
    floor          : Joi.number().integer().required()
  },
  tableName: createTableName(name, env, table)
});

// RESTful functions
//

module.exports = Room;