module.exports = function lecture(sequelize, DataTypes) {
  const Lecture = sequelize.define('lecture', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    time: {
      type: DataTypes.STRING
    },
    day: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });
  Lecture.associate = function (models) {
    Lecture.belongsTo(models.week, {foreignKey: 'weekId'});
    Lecture.belongsTo(models.discipline, {foreignKey: 'disciplineId'});
  };
  return Lecture;
};
