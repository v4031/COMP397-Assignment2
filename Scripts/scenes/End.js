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
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // CONSTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // Initializing and Instantiating
        End.prototype.Start = function () {
            this._gameOverLabel = new objects.Label("Game Over", "70px", "Consolas", "#FFFF00", 320, 180, true);
            // buttons
            this._restartButton = new objects.Button("restartButton", 400, 430, true);
            this._space = new objects.Space();
            this._scoreBoard = new managers.ScoreBoard();
            this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
            this.Main();
        };
        End.prototype.Update = function () {
            this._space.Update();
        };
        End.prototype.Main = function () {
            this.addChild(this._space);
            this.addChild(this._gameOverLabel);
            this.addChild(this._restartButton);
            this.addChild(this._scoreBoard.highScoreLabel);
            this._restartButton.on("click", function () {
                var startSound = createjs.Sound.play("start");
                startSound.volume = 0.2;
                config.Game.LIVES = 3;
                config.Game.SCORE = 0;
                config.Game.ENEMY_SPEED = 1;
                config.Game.ENEMY_NUM = 5;
                config.Game.SCENE = scenes.State.PLAY;
            });
        };
        End.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map