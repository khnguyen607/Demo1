const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BonusReports = sequelize.define('BonusReports', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tern: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    record: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    documentReference: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bonus: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    penalty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
   
}, {
    tableName: 'bonus_reports',
    timestamps: true, // Tự động thêm createdAt, updatedAt
});

module.exports = BonusReports;
