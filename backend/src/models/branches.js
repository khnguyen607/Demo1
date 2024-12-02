const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Branches = sequelize.define('Branches', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'branches',
    timestamps: true, // Tự động thêm createdAt, updatedAt
});

module.exports = Branches;
