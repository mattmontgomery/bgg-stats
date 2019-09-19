
import Query from "./types/query";
import String from "./types/string";
import Game from "./types/game";
import ID from "./types/id";
import Int from "./types/int";
import GameStats from "./types/game-stats";
import GameRatings from "./types/game-ratings";
import Float from "./types/float";
import GameStatus from "./types/game-status";
import Boolean from "./types/boolean";
import __Schema from "./types/schema";
import __Type from "./types/type";
import __TypeKind from "./types/type-kind";
import __Field from "./types/field";
import __InputValue from "./types/input-value";
import __EnumValue from "./types/enum-value";
import __Directive from "./types/directive";
import __DirectiveLocation from "./types/directive-location";
const Types = {
  types: {}
};
Types.types["Query"] = Query;
Types.types["String"] = String;
Types.types["Game"] = Game;
Types.types["ID"] = ID;
Types.types["Int"] = Int;
Types.types["GameStats"] = GameStats;
Types.types["GameRatings"] = GameRatings;
Types.types["Float"] = Float;
Types.types["GameStatus"] = GameStatus;
Types.types["Boolean"] = Boolean;
Types.types["__Schema"] = __Schema;
Types.types["__Type"] = __Type;
Types.types["__TypeKind"] = __TypeKind;
Types.types["__Field"] = __Field;
Types.types["__InputValue"] = __InputValue;
Types.types["__EnumValue"] = __EnumValue;
Types.types["__Directive"] = __Directive;
Types.types["__DirectiveLocation"] = __DirectiveLocation;
Types.queryType = "Query";
Types.mutationType = null;
Types.subscriptionType = null;

function recursivelyFreezeObject(structure) {
  Object.getOwnPropertyNames(structure).forEach(key => {
    const value = structure[key];
    if (value && typeof value === 'object') {
      recursivelyFreezeObject(value);
    }
  });
  Object.freeze(structure);
  return structure;
}

export default recursivelyFreezeObject(Types);