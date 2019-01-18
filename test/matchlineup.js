"use strict";
module.exports = (sequelize, DataTypes) => {
  const MatchLineup = sequelize.define(
    "MatchLineup",
    {
      match: {
        type: DataTypes.STRING,
        references: {
          model: sequelize.models.Match
        }
      },
      team: {
        type: DataTypes.STRING,
        references: {
          model: sequelize.models.Team
        }
      },
      player: DataTypes.STRING,
      position: DataTypes.STRING,
      shirtNumber: DataTypes.INTEGER,
      positionId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      subPosition: DataTypes.STRING,
      subPositionId: DataTypes.INTEGER,
      isCaptain: DataTypes.BOOLEAN
    },
    {}
  );
  MatchLineup.associate = function(models) {
    // MatchLineup.belongsTo(models.Match, {
    //   foreign_key: "match",
    //   target_key: "id"
    // });
    // MatchLineup.belongsTo(models.Team, {
    //   foreign_key: "team",
    //   target_key: "id"
    // });
    // associations can be defined here
  };
  return MatchLineup;
};
