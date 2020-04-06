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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        // PRIVATE INSTANCE MEMBERS
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Bullet() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "bullet", new objects.Vector2(), true) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Bullet.prototype._checkBounds = function () {
            // check upper bounds
            if (this.position.x <= -this.width) {
                this.Reset();
            }
            // check lower bounds
            if (this.position.x >= config.Game.SCREEN_WIDTH + this.width) {
                this.Reset();
            }
        };
        Bullet.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Bullet.prototype.Start = function () {
            this.type = enums.GameObjectType.UNDEFINED;
            this.speed = 4; // 4 px per frame
            this.Reset();
        };
        Bullet.prototype.Update = function () {
            if (this.isActive) {
                this.velocity;
                this._move();
                this._checkBounds();
            }
        };
        Bullet.prototype.Reset = function () {
            this.position = new objects.Vector2(-1000, -1000);
            this.isActive = false;
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map