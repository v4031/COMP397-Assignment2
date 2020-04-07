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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            this._title = new objects.Label("A Random Space Shooter", "40px", "Consolas", "#FFFFFF", 320, 180, true);
            this._instruction = new objects.Label("Use Arrow Keys or WASD to move,Use mouse to aim and Spacebar to Shoot. \n\nKill enemies for points. Collect power up for random upgrade.", "14px", "Consolas", "#FFFFFF", 320, 280, true);
            this._startButton = new objects.Button("startButton", 400, 430, true);
            this._space = new objects.Space();
            this.Main();
        };
        Start.prototype.Update = function () {
            this._space.Update();
        };
        Start.prototype.Main = function () {
            this.addChild(this._space);
            this.addChild(this._title);
            this.addChild(this._instruction);
            this.addChild(this._startButton);
            this._startButton.on("click", function () {
                var startSound = createjs.Sound.play("start");
                startSound.volume = 0.2;
                config.Game.SCENE = scenes.State.PLAY;
            });
        };
        Start.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map