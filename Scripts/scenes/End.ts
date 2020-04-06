module scenes
{
    export class End extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _gameOverLabel: objects.Label;
        private _restartButton: objects.Button;
        private _space: objects.Space;
        private _scoreBoard: managers.ScoreBoard;

        // CONSTRUCTOR
        constructor()
        {
            super();
            this.Start();
        }
        // Initializing and Instantiating
        public Start(): void 
        {
            this._gameOverLabel = new objects.Label("Game Over", "70px", "Consolas", "#FFFF00", 320, 180, true);

            // buttons
             this._restartButton = new objects.Button("restartButton", 400, 430, true);

            
             this._space = new objects.Space();
             this._scoreBoard  = new managers.ScoreBoard();
             this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
             this.Main();
        }        
        
        public Update(): void 
        {
            this._space.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._space);
            this.addChild(this._gameOverLabel);
            this.addChild(this._restartButton);
            this.addChild(this._scoreBoard.highScoreLabel);

            this._restartButton.on("click", ()=>{
                config.Game.LIVES = 3;
                config.Game.SCORE = 0;
                config.Game.ENEMY_SPEED = 1;
                config.Game.ENEMY_NUM = 1;
                config.Game.SCENE = scenes.State.PLAY;
            });


        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}