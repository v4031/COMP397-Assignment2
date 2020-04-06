module objects
{
    export abstract class GameObject extends createjs.Sprite
    {
        // PRIVATE INSTANCE MEMBERS
        private _width:number;
        private _height:number;
        private _halfWidth:number;
        private _halfHeight:number;
        private _speed:number;

        private _position:Vector2;
        private _velocity:Vector2;

        private _isColliding:boolean;
        private _isCentered:boolean;
        private _isActive : boolean;

        private _type: enums.GameObjectType;

        // PUBLIC PROPERTIES
        get width():number
        {
            return this._width;
        }

        set width(newWidth:number)
        {
            this._width = newWidth;
            this._halfWidth = this._computeHalfWidth();
        }
        get speed():number
        {
            return this._speed;
        }

        set speed(newSpeed:number)
        {
            this._speed = newSpeed;
        }

        get height():number
        {
            return this._height;
        }

        set height(newHeight:number)
        {
            this._height = newHeight;
            this._halfHeight = this._computeHalfHeight();
        }

        get halfWidth():number
        {
            return this._halfWidth;
        }

        get halfHeight():number
        {
            return this._halfHeight;
        }

        get position():Vector2
        {
            return this._position;
        }

        set position(newPosition:Vector2)
        {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        get velocity():Vector2
        {
            return this._velocity;
        }

        set velocity(newVelocity:Vector2)
        {
            this._velocity = newVelocity;
        }

        get isColliding():boolean
        {
            return this._isColliding;
        }

        set isColliding(newState:boolean)
        {
            this._isColliding = newState;
        }

        get isCentered():boolean
        {
            return this._isCentered;
        }

        set isCentered(newState:boolean)
        {
            this._isCentered = newState;
            if(newState)
            {
                this._centerGameObject();
            }
        }

        public get isActive() : boolean 
        {
            return this._isActive;
        }
        
        public set isActive(v : boolean) 
        {
            this._isActive = v;
        }

        public get type() : enums.GameObjectType 
        {
            return this._type;
        }

        public set type(v : enums.GameObjectType) 
        {
            this._type = v;
        }


        // CONSTRUCTOR
        constructor(sprite_sheet?:createjs.SpriteSheet, frame_name?: string, x?:number, y?:number, centered?:boolean)
        constructor(sprite_sheet:createjs.SpriteSheet, frame_name: string, position: objects.Vector2, centered?: boolean)
        constructor(first: createjs.SpriteSheet,second: string = "placeholder",  third: Vector2 | number = 0, fourth: boolean | number = 0, fifth:boolean = false)
        {
            super(first, second);

            // initialization
            this._width = 0;
            this._height = 0;
            this._halfWidth = 0;
            this._halfHeight = 0;
            this._position = new Vector2(0, 0, this);
            this._velocity = new Vector2(0, 0);
            this._isColliding = false;
            this._isCentered = false;
            this._isActive = false;
            
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            if(fifth != undefined)
            {
                this.isCentered = fifth;
            }

            if(typeof fourth == "boolean")
            {
                this.isCentered = fourth;
            }
            

            if((typeof third == "number") && (typeof fourth == "number"))
            {
                this.position = new Vector2(third, fourth, this);
            }

            if(third instanceof Vector2)
            {
                this.position = third;
            }

            this.type = enums.GameObjectType.UNDEFINED;
            

        }

        // PRIVATE METHODS
        private _computeHalfWidth():number
        {
            return this.width * 0.5;
        }

        private _computeHalfHeight():number
        {
            return this.height * 0.5;
        }

        private _centerGameObject():void
        {
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
        }

        protected abstract _checkBounds():void;


        // PUBLIC METHODS

        public abstract Start():void;

        public abstract Update():void;
        
        public abstract Reset():void;

    }

}