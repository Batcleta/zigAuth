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
    username: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = ({ Comments }) => {
    Posts.hasMany(Comments, {
      as: "comments",
      onDelete: "cascade",
      foreignKey: "postId",
    });
  };

  return Posts;
};
