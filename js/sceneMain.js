class SceneMain extends Phaser.Scene{
    constructor() {
        super('SceneMain');
    }
    preload()
    {
    	//loads images or sounds
        this.load.spritesheet('player', 'images/RedHairHighSchooler.png', {frameWidth: 32, frameHeight: 32});

        //tilesets
        this.load.image('tiles1', 'images/tilesets/[A]Water1_pipo.png');
        this.load.image('tiles2', 'images/tilesets/dbdeyft-e1ce0c00-12b2-48cd-92e4-771714a795d9-removebg-preview.png');
        this.load.image('tiles3', 'images/tilesets/samplemap.png');

        //tilemap
        this.load.tilemapTiledJSON('map', 'images/tilemaps/JapFinalHouse.json');
    }
    create() {
        //defines objects
        console.log("Ready!");

        //important variables
        const scaleRatio = 0.55;
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        const tileScale = 1;
        const tileMapWidth = 640;
        const tileMapHeight = 416;

        //grid
        /*
        const grid = new AlignGrid({scene: this, rows: 28, cols: 50});
        grid.showNumbers();
        */

        //tilemap and tilesets
        const map = this.make.tilemap({key: 'map'});
        const tileset1 = map.addTilesetImage('waterStuff', 'tiles1');
        const tileset2 = map.addTilesetImage('japHouse1', 'tiles2');
        const tileset3 = map.addTilesetImage('grassStuff', 'tiles3');
        const grassLayer = map.createLayer('grass', tileset3, 0, 0).setScale(tileScale, tileScale);
        const nonCollisionLayer = map.createLayer('nonCollisions', tileset2, 0, 0).setScale(tileScale, tileScale);
        const collisionLayer = map.createLayer('Collisions', [tileset2, tileset1], 0, 0).setScale(tileScale, tileScale);
        collisionLayer.setCollisionByExclusion(-1, true);

        //button stuff
        this.createButtons();

        //player stuff
        this.player = this.physics.add.sprite(0.47 * gameWidth, 0.7 *gameHeight, 'player');
        this.player.setScale(scaleRatio, scaleRatio);
        this.createPlayer(this.player, gameWidth, gameHeight);
        this.physics.add.existing(this.player, true);
        this.player.body.allowGravity = false;
        this.player.setSize(this.player.width, 0.5*this.player.height);
        this.player.setOffset(0, 0.5*this.player.height);
        this.physics.add.collider(this.player, collisionLayer);
        this.player.setCollideWorldBounds(true);
        this.keyboard = this.input.keyboard.addKeys('W, A, S, D');
        this.direction = null;
    }
    update(delta) {
        //checks for collisions and updates values 
        this.updatePlayer(this.player);
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
            frames: this.anims.generateFrameNumbers('player', {frames: [3, 4, 5]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNumbers('player', {frames: [6, 7, 8]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walkUp',
            frames: this.anims.generateFrameNumbers('player', {frames: [9, 10, 11]}),
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
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('player', {frames: [3]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('player', {frames: [7]}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idleUp',
            frames: this.anims.generateFrameNumbers('player', {frames: [10]}),
            frameRate: 8,
            repeat: -1
        });
    }
    updatePlayer(user){
        const playerSpeed = 25
        if(this.keyboard.S.isDown === true){
            user.setVelocityY(playerSpeed);
            this.direction = 'down';
            user.play('walkDown', true);
        }
        else if(this.keyboard.A.isDown === true){
            user.setVelocityX(-playerSpeed);
            this.direction = 'left';
            user.play('walkLeft', true);
        }
        else if(this.keyboard.D.isDown === true){
            user.setVelocityX(playerSpeed);
            this.direction = 'right';
            user.play('walkRight', true);
        }
        else if(this.keyboard.W.isDown === true){
            user.setVelocityY(-playerSpeed);
            this.direction = 'up';
            user.play('walkUp', true);
        }
        else{
            user.setVelocityX(0);
            user.setVelocityY(0);
            if(this.direction === 'down'){
                user.play('idleDown', true);
                console.log('playing');
            }
            else if(this.direction === 'left'){
                user.play('idleLeft', true);
            }
            else if(this.direction === 'right'){
                user.play('idleRight', true);
            }
            else if(this.direction === 'up'){
                user.play('idleUp', true);
            }
        }
    }

    createButtons(){
        this.description = this.add.text(200, 390, 'N/A', {fill: 'black'});
        this.description.setVisible(false);
        const interiorButton = this.add.text(283, 230, '入口', {fill: 'white'});
        interiorButton.setInteractive();
        interiorButton.on('pointerdown', () => {this.scene.start('SceneInterior')});

        const bathroomButton = this.add.text(460, 210, 'お手洗い', {fill: 'white'});
        bathroomButton.setInteractive();
        bathroomButton.on('pointerdown', () => {this.scene.start('SceneBathroom')});

        const sakuraButton = this.add.text(25, 220, '桜', {fill: 'white'});
        sakuraButton.setInteractive();
        sakuraButton.on('pointerdown', () => {this.interactMessage('二本桜があります。')});

        const pondButton = this.add.text(495, 330, '鯉の池', {fill: 'white'});
        pondButton.setInteractive();
        pondButton.on('pointerdown', () => {this.interactMessage('ゼロっぴき鯉がいます。')});
    }
    interactMessage(text){
        this.description.text = text;
        this.description.setVisible(true);
        this.description.setInteractive();
        this.description.on('pointerdown', () => {
            this.description.setVisible(false);
            this.description.text = 'N/A';
            this.description.setInteractive(false);
        })
    }
}