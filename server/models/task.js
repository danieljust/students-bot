module.exports = function task(sequelize, DataTypes) {
  const Task = sequelize.define('task', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    deadline: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
  Task.associate = function (models) {
    Task.belongsTo(models.lecture, {foreignKey: 'lectureId'});
  };
  return Task;
};
