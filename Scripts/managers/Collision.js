"use strict";
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.squaredRadiusCheck = function (object1, object2) {
            // squared radius check
            var radii = object1.halfHeight + object2.halfHeight;
            if (objects.Vector2.sqrDistance(object1.position, object2.position) < (radii * radii)) {
                if (!object2.isColliding) {
                    Collision._collisionResponse(object1, object2);
                    object2.isColliding = true;
                    return true;
                }
            }
            else {
                object2.isColliding = false;
            }
            return false;
        };
        Collision.AABBCheck = function (object1, object2) {
            var object1Offset = (!object1.isCentered) ? new objects.Vector2(0, 0) : new objects.Vector2(object1.halfWidth, object1.halfHeight);
            var object2Offset = (!object2.isCentered) ? new objects.Vector2(0, 0) : new objects.Vector2(object2.halfWidth, object2.halfHeight);
            var object1TopLeft = new objects.Vector2(object1.position.x - object1Offset.x, object1.position.y - object1Offset.y);
            var object2TopLeft = new objects.Vector2(object2.position.x - object2Offset.x, object2.position.y - object2Offset.y);
            // AABB Collision Detection
            if (object1TopLeft.x < object2TopLeft.x + object2.width &&
                object1TopLeft.x + object1.width > object2TopLeft.x &&
                object1TopLeft.y < object2TopLeft.y + object2.height &&
                object1TopLeft.y + object1.height > object2TopLeft.y) {
                if (!object2.isColliding) {
                    Collision._collisionResponse(object1, object2);
                    object2.isColliding = true;
                    return true;
                }
            }
            else {
                object2.isColliding = false;
            }
            return false;
        };
        /**
         * Helper method to assist with Collision Response
         *
         * @private
         * @static
         * @param {objects.GameObject} object2
         * @memberof Collision
         */
        Collision._collisionResponse = function (object1, object2) {
            switch (object2.type) {
                case enums.GameObjectType.UPGRADE:
                    {
                        if (object1.type == enums.GameObjectType.PLAYER) {
                            var yaySound = createjs.Sound.play("yay");
                            yaySound.volume = 0.2;
                            config.Game.PLAYER.Upgrade();
                            if (config.Game.SCORE >= 1000 && config.Game.SCORE % 1000 == 0) {
                                console.log("yay");
                                config.Game.SCORE_BOARD.Lives += 1;
                            }
                            object2.Reset();
                        }
                    }
                    break;
                case enums.GameObjectType.ENEMY:
                    {
                        if (object1.type == enums.GameObjectType.BULLET) {
                            config.Game.SCORE_BOARD.Score += 100;
                            if (config.Game.SCORE >= 1000 && config.Game.SCORE % 1000 == 0) {
                                console.log("yay");
                                config.Game.SCORE_BOARD.Lives += 1;
                            }
                            if (config.Game.SCORE > config.Game.HIGH_SCORE) {
                                config.Game.HIGH_SCORE = config.Game.SCORE;
                            }
                            object2.Reset();
                            object1.Reset();
                        }
                        if (object1.type == enums.GameObjectType.PLAYER) {
                            console.log("Collision with Cloud!");
                            var thunderSound = createjs.Sound.play("thunder");
                            thunderSound.volume = 0.2;
                            config.Game.SCORE_BOARD.Lives -= 1;
                            // check if lives falls less than 1 and then switch to END scene
                            if (config.Game.LIVES < 1) {
                                config.Game.SCENE = scenes.State.END;
                            }
                            object2.Reset();
                        }
                    }
                    break;
                case enums.GameObjectType.ENEMY_BULLET:
                    {
                        var thunderSound = createjs.Sound.play("thunder");
                        thunderSound.volume = 0.2;
                        config.Game.SCORE_BOARD.Lives -= 1;
                        // check if lives falls less than 1 and then switch to END scene
                        if (config.Game.LIVES < 1) {
                            config.Game.SCENE = scenes.State.END;
                        }
                        object2.Reset();
                    }
                    break;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=Collision.js.map