const { DataTypes, Model } = require('sequelize');
const notifymeDB = require('../config/dbConnection.js');

const users = notifymeDB.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
  timestamps: true // Enable timestamps
});

async function syncDatabase() {
    try {
      await notifymeDB.sync();
      console.log("Database synchronized successfully.");
    } catch (error) {
      console.error('Failed to synchronize the database:', error);
    }
  }
  
  syncDatabase();
  
  module.exports = users;