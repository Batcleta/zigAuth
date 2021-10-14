module.exports = (sequelize, Datatypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = ({ Posts, Comments }) => {
    Users.hasMany(Posts, {
      as: "Posts",
      onDelete: "cascade",
      foreignKey: "userId",
    });

    Users.hasMany(Comments, {
      as: "comments",
      onDelete: "cascade",
      foreignKey: "userId",
    });
  };

  return Users;
};
