module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        text: DataTypes.STRING,
        complete: DataTypes.BOOLEAN
    });
    return Item;
};