module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _space?: objects.Space;
        private _player?: objects.Player;
        private _upgrade?: objects.Upgrade;

        private _enemys: Array<objects.Enemy>;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _keyboardManager: managers.Keyboard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._space = new objects.Space();
            this._player = new objects.Player();
            config.Game.PLAYER = this._player;
            this._upgrade = new objects.Upgrade();
            
            // create the enemy array
            this._enemys = new Array<objects.Enemy>(); // empty container

            // instantiating ENEMY_NUM enemys
            for (let index = 0; index < config.Game.ENEMY_NUM; index++) 
            {
                this._enemys.push(new objects.Enemy());
            }
            
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;

            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;

            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;

             this.Main();
        }        
        
        public Update(): void 
        {
           this._space.Update();

           this._player.Update();

          this._bulletManager.Update();

           this._upgrade.Update();

           managers.Collision.AABBCheck(this._player, this._upgrade);

           this._enemys.forEach(enemy => {
               enemy.Update();
               managers.Collision.squaredRadiusCheck(this._player, enemy);
           });
           this._bulletManager.bulletPool.forEach(bullet => {
            if(bullet.type == enums.GameObjectType.BULLET)
            {
             this._enemys.forEach(enemy => {
                 managers.Collision.squaredRadiusCheck(bullet, enemy);
             });
            }
            if(bullet.type == enums.GameObjectType.ENEMY_BULLET)
            {
                managers.Collision.AABBCheck(this._player, bullet);
            }
        });
        if(createjs.Ticker.getTicks() % 600 == 0)
        {
            console.log("speed up");
            config.Game.ENEMY_SPEED += 0.05;
        }
        }
        
        public Main(): void 
        {
            this.addChild(this._space);

            this.addChild(this._upgrade);

            this.addChild(this._player);

            this._bulletManager.AddBulletsToScene(this);

            for (const enemy of this._enemys) {
                this.addChild(enemy);
            }

            this.addChild(this._scoreBoard.LivesLabel);

            this.addChild(this._scoreBoard.ScoreLabel);
        }

        public Clean(): void
        {
            this.removeAllChildren();
        }
    }
}