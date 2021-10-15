module.exports = (sequelize, Datatypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    postText: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
  });

  Posts.associate = ({ Comments, Users }) => {
    Posts.belongsTo(Users, {
      as: "user",
    });

    Posts.hasMany(Comments, {
      as: "comments",
      onDelete: "cascade",
      foreignKey: "postId",
    });
  };

  return Posts;
};
