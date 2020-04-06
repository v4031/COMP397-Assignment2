"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Space = /** @class */ (function (_super) {
        __extends(Space, _super);
        // PRIVATE INSTANCE MEMBERS
        // CONSTRUCTOR
        function Space() {
            var _this = _super.call(this, config.Game.SPACE_ATLAS, "space") || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Space.prototype._checkBounds = function () {
            if (this.x <= -720) {
                this.Reset();
            }
        };
        Space.prototype._move = function () {
            this.position = objects.Vector2.add(this.velocity, this.position);
        };
        // PUBLIC METHODS
        Space.prototype.Start = function () {
            this.type = enums.GameObjectType.OCEAN;
            this.speed = -3; // 5 px per frame
            this.velocity = new objects.Vector2(this.speed, 0);
            this.Reset();
        };
        Space.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Space.prototype.Reset = function () {
            this.position = new objects.Vector2(0, 0);
        };
        return Space;
    }(objects.GameObject));
    objects.Space = Space;
})(objects || (objects = {}));
//# sourceMappingURL=Space.js.map