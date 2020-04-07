//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let currentSceneState:scenes.State;
    let currentScene: objects.Scene;

    let assets: createjs.LoadQueue;

    let textureAtlas: createjs.SpriteSheet;
    let spaceAtlas: createjs.SpriteSheet;

    let assetManifest = 
    [
        {id:"space", src:"./Assets/images/bg_space_seamless.png"},
        {id:"atlas", src:"./Assets/images/test.png"},
        {id:"start", src:"./Assets/audio/start.mp3"},
        {id:"laser", src:"./Assets/audio/laser.mp3"},
        {id:"hit", src:"./Assets/audio/hit.wav"},
        {id:"powerUp", src:"./Assets/audio/powerUp.mp3"},
        {id:"sad", src:"./Assets/audio/sad.mp3"}
    ];

    let spriteData =
    {

        "images": {},
        "frames": [
            [1, 1, 150, 50, 0, 75, 25],
            [153, 1, 65, 65, 0, 32.5, 32.5],
            [1, 53, 150, 50, 0, 75, 25],
            [1, 105, 150, 50, 0, 75, 25],
            [153, 68, 30, 36, 0, 15, 18],
            [153, 106, 30, 36, 0, 15, 18],
            [185, 68, 30, 30, 0, 15, 15],
            [185, 100, 30, 26, 0, 15, 13],
            [185, 128, 16, 16, 0, 8, 8]
        ],
        
        "animations": {
            "button": { "frames": [0] },
            "placeholder": { "frames": [1] },
            "restartButton": { "frames": [2] },
            "startButton": { "frames": [3] },
            "spaceship": { 
                "frames": [4, 5],
                "speed": 0.1 
                    },
            "powerup": { "frames": [6] },
            "enemy": { "frames": [7] },
            "bullet": { "frames": [8] }
        }
        
        };

    let spaceData = 
    {
        "images": {},
        "frames": [
            [0, 0, 1440, 640, 0, 0, 0],
        ],
        "animations": {
            "space": { "frames": [0] },
        }
    }


    function Preload():void
    {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Game Started!`, "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);       
        config.Game.STAGE = stage;
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);

        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;

        spaceData.images = [assets.getResult("space")];
        spaceAtlas = new createjs.SpriteSheet(spaceData);
        config.Game.SPACE_ATLAS = spaceAtlas;
        
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        if(currentSceneState != config.Game.SCENE)
        {
            Main();
        }

        currentScene.Update();
        


        stage.update();
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Scene Switched...`, "color: green; font-size: 16px;");

        // clean up
        if(currentSceneState != scenes.State.NO_SCENE)
        {
            currentScene.Clean();
            stage.removeAllChildren();
        }

        // switch to the new scene  

        switch(config.Game.SCENE)
        {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start(); 
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play(); 
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End(); 
                break;
        }

        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);

    }

    window.addEventListener('load', Preload);


})();