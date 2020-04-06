"use strict";
var enums;
(function (enums) {
    var GameObjectType;
    (function (GameObjectType) {
        GameObjectType[GameObjectType["PLANE"] = 0] = "PLANE";
        GameObjectType[GameObjectType["UPGRADE"] = 1] = "UPGRADE";
        GameObjectType[GameObjectType["ENEMY"] = 2] = "ENEMY";
        GameObjectType[GameObjectType["OCEAN"] = 3] = "OCEAN";
        GameObjectType[GameObjectType["BUTTON"] = 4] = "BUTTON";
        GameObjectType[GameObjectType["PLAYER"] = 5] = "PLAYER";
        GameObjectType[GameObjectType["BULLET"] = 6] = "BULLET";
        GameObjectType[GameObjectType["ENEMY_BULLET"] = 7] = "ENEMY_BULLET";
        GameObjectType[GameObjectType["UNDEFINED"] = 8] = "UNDEFINED";
        GameObjectType[GameObjectType["NUM_OF_TYPES"] = 9] = "NUM_OF_TYPES";
    })(GameObjectType = enums.GameObjectType || (enums.GameObjectType = {}));
})(enums || (enums = {}));
//# sourceMappingURL=GameObjectType.js.map