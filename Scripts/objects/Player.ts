module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _engineSound : createjs.AbstractSoundInstance;
        private _bulletSpawn: objects.Vector2;
        private _dir: number;
        private _angle: number;
        private _fireRate: number;
        
        // PUBLIC PROPERTIES
        public get engineSound() : createjs.AbstractSoundInstance 
        {
            return this._engineSound;
        }
        public get fireRate()
        {
            return this._fireRate;
        }
        public set fireRate(newRate: number)
        {
            this._fireRate = newRate;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "spaceship", 0, 0, false);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // checks the right boundary
            if(this.x > 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }

            // check the left boundary
            if(this.x < this.halfWidth) {
                this.x = this.halfWidth;
            }
            // checks the bot boundary
            if(this.y > 480 - this.halfHeight) {
                this.y = 480 - this.halfHeight;
            }

            // check the top boundary
            if(this.y < this.halfHeight) {
                this.y = this.halfHeight;
            }
        }        

        private _move(): void
        {
            if(config.Game.KEYBOARD_MANAGER.MoveUp || config.Game.KEYBOARD_MANAGER.MoveDown)
            {
                (config.Game.KEYBOARD_MANAGER.MoveDown) ? 
                this.y +=this.speed : this.y -= this.speed;
                this.position.y = this.y;
            }
            
            if((config.Game.KEYBOARD_MANAGER.MoveLeft) || (config.Game.KEYBOARD_MANAGER.MoveRight))
            {
                (config.Game.KEYBOARD_MANAGER.MoveRight) ? 
                this.x += this.speed : this.x -= this.speed;
                this.position.x = this.x;
            }
            let dx = Math.cos(this._dir);
            let dy = Math.sin(this._dir);
            this._bulletSpawn = new Vector2(this.position.x + dx * 40, this.position.y + dy * 40);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.PLAYER;
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1; // loop forever
            this._engineSound.volume = 0.1; // 10% volume
            this.speed = 3;
            this._fireRate = 40;
            this.position = new objects.Vector2(this.halfWidth,config.Game.SCREEN_HEIGHT * 0.5);
        }

        public Update(): void 
        {
            this._dir = Math.atan2(config.Game.STAGE.mouseY - this.y, config.Game.STAGE.mouseX - this.x);
            this.Rotate();
            this._move();
            this._checkBounds();
            let test = createjs.Ticker.getTicks() % this._fireRate;
            // fire bullets every 10 frames
            if(test == 0 && config.Game.KEYBOARD_MANAGER.Fire)
            {
                    this.FireBullets();
            }
            
        }

        public Reset(): void 
        {

        }

        public FireBullets(): void
        {
            let bullet = config.Game.BULLET_MANAGER.GetBullet();
            bullet.type = enums.GameObjectType.BULLET;
            bullet.position = this._bulletSpawn;
            bullet.velocity = new Vector2(Math.cos(this._dir) * bullet.speed, Math.sin(this._dir) * bullet.speed)
        }


        public Upgrade(): void
        {
            console.log("upgrade")
            let rand = util.Mathf.RandomIntRange(0,2)
            switch(rand)
            {
                case 0:
                    {
                        if(this.fireRate > 8)
                        {
                            console.log("Fire Rate Upgrade");
                            this.fireRate -= 4;
                        }
                        else
                        {
                            console.log("Fire Rate Maxed");
                            config.Game.SCORE_BOARD.Score += 100;
                        }
                    }
                    break;
                case 1:
                    {
                        if(this.speed < 10)
                        {
                            console.log("Speed Upgrade");
                            this.speed +=0.5;
                        }
                        else
                        {
                            console.log("Speed Maxed");
                            config.Game.SCORE_BOARD.Score += 100;
                        }
                    }
                    break;
                case 2:
                    {
                        if(config.Game.BULLET_MANAGER.playerBulletSpeed < 10)
                        {
                        config.Game.BULLET_MANAGER.SpeedUpgrade();
                        console.log("Bullet Speed:" + config.Game.BULLET_MANAGER.playerBulletSpeed);
                        }
                        else
                        {
                            console.log("Bullet Speed Maxed");
                            config.Game.SCORE_BOARD.Score += 100;
                        }
                    }
                    break;
            }
            if(config.Game.SCORE > config.Game.HIGH_SCORE)
            {
                config.Game.HIGH_SCORE = config.Game.SCORE;
            }
        }
        //Rotate player towards mouse position
        public Rotate()
        {
            this._angle = this._dir * (180/Math.PI);
            if(this._angle < 0)
            {
                this._angle = 360 +this._angle;
            }
            this.rotation = 90+ this._angle;
        }
        
    }

}
