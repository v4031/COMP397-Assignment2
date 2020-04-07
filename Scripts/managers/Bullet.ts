module managers
{
    export class Bullet 
    {
        // PRIVATE INSTANCE MEMBERS
        private _bulletNumber: number;
        private _playerBulletSpeed: number = 2;
        private _enemyBulletSpeed: number = 2;
        private _bulletPool: Array<objects.Bullet>;

        // PUBLIC PROPERTIES

        get playerBulletSpeed():number
        {
            return this._playerBulletSpeed;
        }

        set playerBulletSpeed(newSpeed:number)
        {
            this._playerBulletSpeed = newSpeed;
        }

        get enemyBulletSpeed():number
        {
            return this._enemyBulletSpeed;
        }

        set enemyBulletSpeed(newSpeed:number)
        {
            this._enemyBulletSpeed = newSpeed;
        }

        // CONSTRUCTOR
        constructor()
        {

            this._buildBulletPool();
        }

        // PRIVATE METHODS
        private _buildBulletPool():void
        {
            // initialize bullet number
            this._bulletNumber = 50;

            // create an empty container
            this._bulletPool = new Array<objects.Bullet>();

            for (let count = 0; count < this._bulletNumber; count++) {
                let bullet = new objects.Bullet();
                this._bulletPool.push(bullet);
            }
        }

        // PUBLIC METHODS

        get bulletPool()
        {
            return this._bulletPool;
        }
        public AddBulletsToScene(scene:objects.Scene)
        {
            this._bulletPool.forEach(bullet => {
                scene.addChild(bullet);
            });
        }


        public GetBullet():objects.Bullet
        {
            // remove the bullet from the front of the pool
            let bullet = this._bulletPool.shift();

            bullet.isActive = true;

            // push the bullet to the back of the pool
            this._bulletPool.push(bullet);

            // return a reference to the active bullet
            return bullet;
        }

        public Update()
        {   
            this._bulletPool.forEach(bullet => {
                if(bullet.type == enums.GameObjectType.BULLET)
                {
                    bullet.speed = 4 + this._playerBulletSpeed;
                }
                else if(bullet.type == enums.GameObjectType.ENEMY_BULLET)
                {
                    bullet.speed = 4 + this._enemyBulletSpeed + config.Game.ENEMY_SPEED/2;
                }
                bullet.Update();
            });
        }
        public SpeedUpgrade()
        {
            this._playerBulletSpeed+= 2;
        }
    }
}