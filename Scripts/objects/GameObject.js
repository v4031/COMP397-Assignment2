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
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        function GameObject(first, second, third, fourth, fifth) {
            if (second === void 0) { second = "placeholder"; }
            if (third === void 0) { third = 0; }
            if (fourth === void 0) { fourth = 0; }
            if (fifth === void 0) { fifth = false; }
            var _this = _super.call(this, first, second) || this;
            // initialization
            _this._width = 0;
            _this._height = 0;
            _this._halfWidth = 0;
            _this._halfHeight = 0;
            _this._position = new objects.Vector2(0, 0, _this);
            _this._velocity = new objects.Vector2(0, 0);
            _this._isColliding = false;
            _this._isCentered = false;
            _this._isActive = false;
            _this.width = _this.getBounds().width;
            _this.height = _this.getBounds().height;
            if (fifth != undefined) {
                _this.isCentered = fifth;
            }
            if (typeof fourth == "boolean") {
                _this.isCentered = fourth;
            }
            if ((typeof third == "number") && (typeof fourth == "number")) {
                _this.position = new objects.Vector2(third, fourth, _this);
            }
            if (third instanceof objects.Vector2) {
                _this.position = third;
            }
            _this.type = enums.GameObjectType.UNDEFINED;
            return _this;
        }
        Object.defineProperty(GameObject.prototype, "width", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._width;
            },
            set: function (newWidth) {
                this._width = newWidth;
                this._halfWidth = this._computeHalfWidth();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "speed", {
            get: function () {
                return this._speed;
            },
            set: function (newSpeed) {
                this._speed = newSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (newHeight) {
                this._height = newHeight;
                this._halfHeight = this._computeHalfHeight();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "halfWidth", {
            get: function () {
                return this._halfWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "halfHeight", {
            get: function () {
                return this._halfHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (newPosition) {
                this._position = newPosition;
                this.x = newPosition.x;
                this.y = newPosition.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "velocity", {
            get: function () {
                return this._velocity;
            },
            set: function (newVelocity) {
                this._velocity = newVelocity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "isColliding", {
            get: function () {
                return this._isColliding;
            },
            set: function (newState) {
                this._isColliding = newState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "isCentered", {
            get: function () {
                return this._isCentered;
            },
            set: function (newState) {
                this._isCentered = newState;
                if (newState) {
                    this._centerGameObject();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "isActive", {
            get: function () {
                return this._isActive;
            },
            set: function (v) {
                this._isActive = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (v) {
                this._type = v;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        GameObject.prototype._computeHalfWidth = function () {
            return this.width * 0.5;
        };
        GameObject.prototype._computeHalfHeight = function () {
            return this.height * 0.5;
        };
        GameObject.prototype._centerGameObject = function () {
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        };
        return GameObject;
    }(createjs.Sprite));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=GameObject.js.map