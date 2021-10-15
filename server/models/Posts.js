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

  Posts.associate = ({ Comments, Users, Likes }) => {
    Posts.belongsTo(Users, {
      as: "user",
    });

    Posts.hasMany(Comments, {
      as: "comments",
      onDelete: "cascade",
      foreignKey: "postId",
    });

    Posts.hasMany(Likes, {
      as: "likes",
      onDelete: "cascade",
      foreignKey: "postId",
    });
  };

  return Posts;
};
