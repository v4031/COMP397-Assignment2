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
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._space = new objects.Space();
            this._player = new objects.Player();
            config.Game.PLAYER = this._player;
            this._upgrade = new objects.Upgrade();
            // create the enemy array
            this._enemys = new Array(); // empty container
            // instantiating ENEMY_NUM enemys
            for (var index = 0; index < config.Game.ENEMY_NUM; index++) {
                this._enemys.push(new objects.Enemy());
            }
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;
            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._space.Update();
            this._player.Update();
            this._bulletManager.Update();
            this._upgrade.Update();
            managers.Collision.AABBCheck(this._player, this._upgrade);
            this._enemys.forEach(function (enemy) {
                enemy.Update();
                managers.Collision.squaredRadiusCheck(_this._player, enemy);
            });
            this._bulletManager.bulletPool.forEach(function (bullet) {
                if (bullet.type == enums.GameObjectType.BULLET) {
                    _this._enemys.forEach(function (enemy) {
                        managers.Collision.squaredRadiusCheck(bullet, enemy);
                    });
                }
                if (bullet.type == enums.GameObjectType.ENEMY_BULLET) {
                    managers.Collision.AABBCheck(_this._player, bullet);
                }
            });
            if (createjs.Ticker.getTicks() % 600 == 0) {
                console.log("speed up");
                switch (util.Mathf.RandomIntRange(0, 1)) {
                    case 0:
                        {
                            config.Game.ENEMY_SPEED += 0.05;
                        }
                        break;
                    case 1:
                        {
                            config.Game.ENEMY_NUM += 1;
                        }
                        break;
                }
            }
        };
        Play.prototype.Main = function () {
            this.addChild(this._space);
            this.addChild(this._upgrade);
            this.addChild(this._player);
            this._bulletManager.AddBulletsToScene(this);
            for (var _i = 0, _a = this._enemys; _i < _a.length; _i++) {
                var enemy = _a[_i];
                this.addChild(enemy);
            }
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
        };
        Play.prototype.Clean = function () {
            this._player.engineSound.stop();
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map