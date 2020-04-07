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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Enemy() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "enemy", new objects.Vector2(), true) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Enemy.prototype._checkBounds = function () {
            if (this.x <= -this.width) {
                this.Reset();
            }
            if (this.y <= -this.height) {
                this.Reset();
            }
            if (this.y >= config.Game.SCREEN_HEIGHT + this.height) {
                this.Reset();
            }
        };
        Enemy.prototype._move = function () {
            this.position = objects.Vector2.add(this.position, this.velocity);
        };
        // PUBLIC METHODS
        Enemy.prototype.Start = function () {
            this.type = enums.GameObjectType.ENEMY;
            this.alpha = 0.5; // 50% transparent
            this.Reset();
        };
        Enemy.prototype.Update = function () {
            this._move();
            this._checkBounds();
            this._dir = Math.atan2(this.y - config.Game.PLAYER.y, this.x - config.Game.PLAYER.x);
            var dx = Math.cos(this._dir);
            var dy = Math.sin(this._dir);
            this._bulletSpawn = new objects.Vector2(this.position.x + dx * 40, this.position.y + dy * 40);
            // fire bullets every 90 frames
            var test = createjs.Ticker.getTicks() % 90;
            if (test == 0) {
                this.FireBullets();
            }
        };
        Enemy.prototype.FireBullets = function () {
            var bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.type = enums.GameObjectType.ENEMY_BULLET;
            bullet.position = this._bulletSpawn;
            bullet.velocity = new objects.Vector2(-Math.cos(this._dir) * bullet.speed, -Math.sin(this._dir) * bullet.speed);
        };
        Enemy.prototype.Reset = function () {
            this._verticalSpeed = util.Mathf.RandomRange(-2 * config.Game.ENEMY_SPEED, 2 * config.Game.ENEMY_SPEED);
            this._horizontalSpeed = util.Mathf.RandomRange(4 * config.Game.ENEMY_SPEED, 5 * config.Game.ENEMY_SPEED);
            this.velocity = new objects.Vector2(-this._horizontalSpeed, -this._verticalSpeed);
            var randomX = util.Mathf.RandomRange(config.Game.SCREEN_WIDTH, config.Game.SCREEN_WIDTH * 2);
            var randomY = util.Mathf.RandomRange(this.halfHeight, config.Game.SCREEN_HEIGHT);
            this.position = new objects.Vector2(randomX, randomY);
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map