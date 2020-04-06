module objects
{
    export class Space extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.SPACE_ATLAS, "space");

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            if(this.x <= -720)
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
            this.type = enums.GameObjectType.OCEAN;
            this.speed = -3; // 5 px per frame
            this.velocity = new Vector2( this.speed, 0);
            this.Reset();
        }
        
        public Update(): void 
        {
            this._move();
            this._checkBounds();
        }
        
        public Reset(): void 
        {
            this.position = new Vector2(0, 0);
        }

        
    }
}