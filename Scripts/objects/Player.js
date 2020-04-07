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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR
        function Player() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "spaceship", 0, 0, false) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "engineSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._engineSound;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "fireRate", {
            get: function () {
                return this._fireRate;
            },
            set: function (newRate) {
                this._fireRate = newRate;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
            // checks the right boundary
            if (this.x > 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            // check the left boundary
            if (this.x < this.halfWidth) {
                this.x = this.halfWidth;
            }
            // checks the bot boundary
            if (this.y > 480 - this.halfHeight) {
                this.y = 480 - this.halfHeight;
            }
            // check the top boundary
            if (this.y < this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        Player.prototype._move = function () {
            if (config.Game.KEYBOARD_MANAGER.MoveUp || config.Game.KEYBOARD_MANAGER.MoveDown) {
                (config.Game.KEYBOARD_MANAGER.MoveDown) ?
                    this.y += this.speed : this.y -= this.speed;
                this.position.y = this.y;
            }
            if ((config.Game.KEYBOARD_MANAGER.MoveLeft) || (config.Game.KEYBOARD_MANAGER.MoveRight)) {
                (config.Game.KEYBOARD_MANAGER.MoveRight) ?
                    this.x += this.speed : this.x -= this.speed;
                this.position.x = this.x;
            }
            var dx = Math.cos(this._dir);
            var dy = Math.sin(this._dir);
            this._bulletSpawn = new objects.Vector2(this.position.x + dx * 40, this.position.y + dy * 40);
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
            this.type = enums.GameObjectType.PLAYER;
            this.speed = 3;
            this._fireRate = 40;
            this.position = new objects.Vector2(this.halfWidth, config.Game.SCREEN_HEIGHT * 0.5);
        };
        Player.prototype.Update = function () {
            this._dir = Math.atan2(config.Game.STAGE.mouseY - this.y, config.Game.STAGE.mouseX - this.x);
            this.Rotate();
            this._move();
            this._checkBounds();
            var test = createjs.Ticker.getTicks() % this._fireRate;
            // fire bullets every 10 frames
            if (test == 0 && config.Game.KEYBOARD_MANAGER.Fire) {
                this.FireBullets();
            }
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.FireBullets = function () {
            var laserSound = createjs.Sound.play("laser");
            laserSound.volume = 0.2;
            var bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.type = enums.GameObjectType.BULLET;
            bullet.position = this._bulletSpawn;
            bullet.velocity = new objects.Vector2(Math.cos(this._dir) * bullet.speed, Math.sin(this._dir) * bullet.speed);
        };
        Player.prototype.Upgrade = function () {
            console.log("upgrade");
            var rand = util.Mathf.RandomIntRange(0, 2);
            switch (rand) {
                case 0:
                    {
                        if (this.fireRate > 8) {
                            console.log("Fire Rate Upgrade");
                            this.fireRate -= 4;
                        }
                        else {
                            console.log("Fire Rate Maxed");
                            config.Game.SCORE_BOARD.Score += 100;
                        }
                    }
                    break;
                case 1:
                    {
                        if (this.speed < 10) {
                            console.log("Speed Upgrade");
                            this.speed += 1;
                        }
                        else {
                            console.log("Speed Maxed");
                            config.Game.SCORE_BOARD.Score += 100;
                        }
                    }
                    break;
                case 2:
                    {
                        if (config.Game.BULLET_MANAGER.playerBulletSpeed < 10) {
                            config.Game.BULLET_MANAGER.SpeedUpgrade();
                            console.log("Bullet Speed:" + config.Game.BULLET_MANAGER.playerBulletSpeed);
                        }
                        else {
                            console.log("Bullet Speed Maxed");
                            config.Game.SCORE_BOARD.Score += 100;
                        }
                    }
                    break;
            }
            if (config.Game.SCORE > config.Game.HIGH_SCORE) {
                config.Game.HIGH_SCORE = config.Game.SCORE;
            }
        };
        //Rotate player towards mouse position
        Player.prototype.Rotate = function () {
            this._angle = this._dir * (180 / Math.PI);
            if (this._angle < 0) {
                this._angle = 360 + this._angle;
            }
            this.rotation = 90 + this._angle;
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map