module.exports = (sequelize, Datatypes) => {
  const Likes = sequelize.define("Likes");

  Likes.associate = ({ Users, Posts }) => {
    Likes.belongsTo(Users, {
      as: "user",
    });

    Likes.belongsTo(Posts, {
      as: "post",
    });
  };

  return Likes;
};
