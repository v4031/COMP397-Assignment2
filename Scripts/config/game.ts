module config
{
    export class Game
    {
        public static STAGE: createjs.Stage;
        public static SCREEN_WIDTH:number = 640;
        public static SCREEN_HEIGHT:number = 480;
        public static SCENE: scenes.State;
        public static ASSETS: createjs.LoadQueue;
        public static FPS: number = 60; // 60 Frames per second
        public static ENEMY_NUM: number = 5;
        public static ENEMY_SPEED: number = 1;
        public static LIVES: number = 3;
        public static SCORE: number = 0;
        public static HIGH_SCORE: number = 0;
        public static SCORE_BOARD: managers.ScoreBoard;
        public static BULLET_MANAGER: managers.Bullet;
        public static KEYBOARD_MANAGER: managers.Keyboard;
        public static TEXTURE_ATLAS: createjs.SpriteSheet;
        public static SPACE_ATLAS: createjs.SpriteSheet;
        public static PLAYER: objects.Player;
    }
}