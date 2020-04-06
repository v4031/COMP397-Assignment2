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
    var Upgrade = /** @class */ (function (_super) {
        __extends(Upgrade, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Upgrade() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "powerup", new objects.Vector2(), true) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Upgrade.prototype._checkBounds = function () {
            if (this.x <= -this.width) {
                this.Reset();
            }
        };
        Upgrade.prototype._move = function () {
            this.position = objects.Vector2.add(this.velocity, this.position);
        };
        // PUBLIC METHODS
        Upgrade.prototype.Start = function () {
            this.type = enums.GameObjectType.UPGRADE;
            this._verticalSpeed = 3; // 5 px per frame
            this.velocity = new objects.Vector2(-this._verticalSpeed, 0);
            this.Reset();
        };
        Upgrade.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Upgrade.prototype.Reset = function () {
            var randomX = util.Mathf.RandomRange(this.halfHeight, config.Game.SCREEN_HEIGHT - this.halfHeight);
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 2 + this.width, randomX);
        };
        return Upgrade;
    }(objects.GameObject));
    objects.Upgrade = Upgrade;
})(objects || (objects = {}));
//# sourceMappingURL=Upgrade.js.map