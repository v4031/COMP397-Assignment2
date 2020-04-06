"use strict";
var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        // CONSTRUCTOR
        function Bullet() {
            this._playerBulletSpeed = 2;
            this._enemyBulletSpeed = 2;
            this._buildBulletPool();
        }
        Object.defineProperty(Bullet.prototype, "playerBulletSpeed", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._playerBulletSpeed;
            },
            set: function (newSpeed) {
                this._playerBulletSpeed = newSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bullet.prototype, "enemyBulletSpeed", {
            get: function () {
                return this._enemyBulletSpeed;
            },
            set: function (newSpeed) {
                this._enemyBulletSpeed = newSpeed;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Bullet.prototype._buildBulletPool = function () {
            // initialize bullet number
            this._bulletNumber = 50;
            // create an empty container
            this._bulletPool = new Array();
            for (var count = 0; count < this._bulletNumber; count++) {
                var bullet = new objects.Bullet();
                this._bulletPool.push(bullet);
            }
        };
        Object.defineProperty(Bullet.prototype, "bulletPool", {
            // PUBLIC METHODS
            get: function () {
                return this._bulletPool;
            },
            enumerable: true,
            configurable: true
        });
        Bullet.prototype.AddBulletsToScene = function (scene) {
            this._bulletPool.forEach(function (bullet) {
                scene.addChild(bullet);
            });
        };
        Bullet.prototype.GetBullet = function () {
            // remove the bullet from the front of the pool
            var bullet = this._bulletPool.shift();
            bullet.isActive = true;
            // push the bullet to the back of the pool
            this._bulletPool.push(bullet);
            // return a reference to the active bullet
            return bullet;
        };
        Bullet.prototype.Update = function () {
            var _this = this;
            this._bulletPool.forEach(function (bullet) {
                if (bullet.type == enums.GameObjectType.BULLET) {
                    bullet.speed = 4 + _this._playerBulletSpeed;
                }
                else if (bullet.type == enums.GameObjectType.ENEMY_BULLET) {
                    bullet.speed = 4 + _this._enemyBulletSpeed * config.Game.ENEMY_SPEED;
                }
                bullet.Update();
            });
        };
        Bullet.prototype.SpeedUpgrade = function () {
            this._playerBulletSpeed += 2;
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=Bullet.js.map