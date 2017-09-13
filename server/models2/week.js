module.exports = function week(sequelize, DataTypes) {
  const Week = sequelize.define('week', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    number: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });
  Week.associate = function (models) {
    Week.hasMany(models.lecture, {foreignKey: 'weekId'});
  };
  Week.prototype.getOrder = function () {
    // eslint-disable-next-line
    return (this.get('number') & 1) ? 'Нечетная' : 'Четная';
  };
  return Week;
};
