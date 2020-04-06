module objects
{
    export class Upgrade extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "powerup", new Vector2(), true);

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void 
        {
            if(this.x <= - this.width)
            {
                this.Reset();
            }
        }       
        
        private _move():void
        {
            this.position = Vector2.add(this.velocity, this.position);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.UPGRADE;
            this._verticalSpeed = 3; // 5 px per frame
            this.velocity = new Vector2(-this._verticalSpeed, 0);
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            let randomX = util.Mathf.RandomRange(this.halfHeight, config.Game.SCREEN_HEIGHT - this.halfHeight);
            this.position = new Vector2(config.Game.SCREEN_WIDTH * 2 + this.width, randomX);
        }

        
    }
}