module objects
{
    export class Enemy extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;
        private _horizontalSpeed?:number;
        private _dir: number;
        private _bulletSpawn: objects.Vector2;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "enemy", new Vector2(), true);

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.x <= -this.width)
            {
                this.Reset();
            }
            if(this.y <= -this.height)
            {
                this.Reset();
            }
            if(this.y >= config.Game.SCREEN_HEIGHT+ this.height)
            {
                this.Reset();
            }
        }       
        
        private _move():void
        {
            this.position = Vector2.add(this.position, this.velocity);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.ENEMY;
            this.alpha = 0.5; // 50% transparent
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
            this._dir = Math.atan2(this.y - config.Game.PLAYER.y, this.x - config.Game.PLAYER.x);
            let dx = Math.cos(this._dir);
            let dy = Math.sin(this._dir);
            this._bulletSpawn = new Vector2(this.position.x + dx * 40, this.position.y + dy * 40);
            // fire bullets every 40 frames
            let test = createjs.Ticker.getTicks() % 90;
            if(test == 0)
            {
                    this.FireBullets();
            }
        }

        public FireBullets(): void
        {
            let bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.type = enums.GameObjectType.ENEMY_BULLET;
            bullet.position = this._bulletSpawn;
            bullet.velocity = new Vector2(-Math.cos(this._dir) * bullet.speed, -Math.sin(this._dir) * bullet.speed)
        }
        
        public Reset(): void 
        {
            this._verticalSpeed = util.Mathf.RandomRange(-2 * config.Game.ENEMY_SPEED, 2 * config.Game.ENEMY_SPEED);
            this._horizontalSpeed = util.Mathf.RandomRange(4 * config.Game.ENEMY_SPEED, 5 * config.Game.ENEMY_SPEED);
            this.velocity = new Vector2(-this._horizontalSpeed, -this._verticalSpeed);
            let randomX = util.Mathf.RandomRange(config.Game.SCREEN_WIDTH, config.Game.SCREEN_WIDTH * 2);
            let randomY = util.Mathf.RandomRange(this.halfHeight, config.Game.SCREEN_HEIGHT);
            this.position = new Vector2(randomX, randomY);
        }

        
    }
}