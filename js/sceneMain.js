class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
    	//loads images or sounds
        this.load.spritesheet('player', 'images/RedHairHighSchooler.png', {frameWidth: 32, frameHeight: 32});
    }
    create() {
        //defines objects
        console.log("Ready!");

        //important variables
        const scaleRatio = 0.05;
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        //animations
        //this.createPlayer();

        //grid
        /*
        const grid = new AlignGrid({scene: this, rows: 28, cols: 50});
        grid.showNumbers();
        */
        
        this.player = this.add.sprite(0.5 * gameWidth, 0.7 *gameHeight, 'player');
        this.player.setScale(2, 2);
    }
    update() {
        //checks for collisions and updates values 
    }

    createPlayer(){
        this.anims.create({
            key: 'walkDown',
            frames: this.anims.generateFrameNumbers('player', {frames: [0, 1, 2]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNumbers('player', {frames: [4, 5, 6]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('player', {frames: [8, 9, 10]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkUp',
            frames: this.anims.generateFrameNumbers('player', {frames: [12, 13, 14]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers('player', {frames: [1]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers('player', {frames: [5]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers('player', {frames: [9]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idleDown',
            frames: this.anims.generateFrameNumbers('player', {frames: [13]}),
            frameRate: 8,
            repeat: -1
        });
        
    }
}