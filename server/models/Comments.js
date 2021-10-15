module.exports = (sequelize, Datatypes) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  Comments.associate = ({ Users }) => {
    Comments.belongsTo(Users, {
      as: "user",
    });
  };

  return Comments;
};
