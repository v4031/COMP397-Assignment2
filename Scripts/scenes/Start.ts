module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _title: objects.Label;
        private _instruction: objects.Label;
        private _startButton: objects.Button;
        private _space: objects.Space;

        // CONSTRUCTOR
        constructor()
        {
            super();
            this.Start();
        }
        // PUBLIC METHODS
        public Start(): void 
        {
            this._title = new objects.Label("A Random Space Shooter", "40px", "Consolas", "#FFFFFF", 320, 180, true);
            this._instruction = new objects.Label("Use Arrow Keys or WASD to move,Use mouse to aim and Spacebar to Shoot. \n\nKill enemies for points. Collect power up for random upgrade.", "14px", "Consolas", "#FFFFFF", 320, 280, true);
            this._startButton = new objects.Button("startButton", 400, 430, true);

             this._space = new objects.Space();
            this.Main();
        }        
        
        public Update(): void 
        {
           this._space.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._space);
            this.addChild(this._title);
            this.addChild(this._instruction);
            this.addChild(this._startButton);

            this._startButton.on("click", ()=>{
                let startSound = createjs.Sound.play("start");
                startSound.volume = 0.2;
                config.Game.SCENE = scenes.State.PLAY;
            });

        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}