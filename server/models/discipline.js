module.exports = function week(sequelize, DataTypes) {
  const Discipline = sequelize.define('discipline', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    teacher: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
  Discipline.associate = function (models) {
    Discipline.hasMany(models.lecture, {foreignKey: 'disciplineId'});
  };
  return Discipline;
};
