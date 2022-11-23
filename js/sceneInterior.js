class SceneInterior extends Phaser.Scene{
    constructor(){
        super('SceneInterior');
    }
    preload(){
        //player
        this.load.spritesheet('player', 'images/RedHairHighSchooler.png', {frameWidth: 32, frameHeight: 32});

        //tilesets
        this.load.image('tiles5', 'images/tilesets/Interiors_free_32x32.png');
        this.load.image('tiles6', 'images/tilesets/japaneseInterior.png');
        this.load.image('tiles7', 'images/tilesets/kotatsu.png');
        this.load.image('tiles8', 'images/tilesets/Room_Builder_free_32x32.png');

        //tilemap
        this.load.tilemapTiledJSON('map2', 'images/tilemaps/JapInterior1.json');
    }
    create(){
        //important variables
        const scaleRatio = 2;
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        const tileScale = 1;
        const tileMapWidth = 640;
        const tileMapHeight = 416;

        //tilemap and tilesets
        const map = this.make.tilemap({key: 'map2'});
        const tileset1 = map.addTilesetImage('interior32', 'tiles5');
        const tileset2 = map.addTilesetImage('japaneseInterior', 'tiles6');
        const tileset3 = map.addTilesetImage('Kotatsu', 'tiles7');
        const tileset4 = map.addTilesetImage('room32', 'tiles8');
        const floorLayer = map.createLayer('Floor', [tileset2, tileset4], 0, 0);
        const wallsLayer = map.createLayer('Walls', tileset4, 0, 0);
        const borderLayer = map.createLayer('Border', tileset4, 0, 0);
        const nonCollisionLayer = map.createLayer('NonCollisionDetails', [tileset1, tileset2], 0, 0);
        const collisionLayer = map.createLayer('CollisionDetails', [tileset1, tileset2, tileset3], 0, 0);
        wallsLayer.setCollisionByExclusion(-1, true);
        borderLayer.setCollisionByExclusion(-1, true);
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
        this.physics.add.collider(this.player, [wallsLayer, borderLayer, collisionLayer]);
        this.player.setCollideWorldBounds(true);
        this.keyboard = this.input.keyboard.addKeys('W, A, S, D');
        this.direction = null;
    }
    update(delta){
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
        const playerSpeed = 70
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
        this.description = this.add.text(30, 390, 'N/A', {fill: 'black'});
        this.description.setVisible(false);
        const outsideButton = this.add.text(290, 380, '外（そと）', {fill: 'white'});
        outsideButton.setInteractive();
        outsideButton.on('pointerdown', () => {this.scene.start('SceneMain')});

        const futonButton = this.add.text(35, 110, '布団（ふとん）', {fill: 'white'});
        futonButton.setInteractive();
        futonButton.on('pointerdown', () => {this.interactMessage('一枚（まい）布団があります。')});

        const kotatsuButton = this.add.text(230, 130, '炬燵（こたつ）', {fill: 'white'});
        kotatsuButton.setInteractive();
        kotatsuButton.on('pointerdown', () => {this.interactMessage('一台（だい）炬燵があります。')});

        const plantButton = this.add.text(400, 60, '植物（しょくぶつ）', {fill: 'white'});
        plantButton.setInteractive();
        plantButton.on('pointerdown', () => {this.interactMessage('二鉢（はち）植物があります。')});

        const sittingfutonButton = this.add.text(480, 120, '座布団（ざぶとん）', {fill: 'white'});
        sittingfutonButton.setInteractive();
        sittingfutonButton.on('pointerdown', () => {this.interactMessage('四枚（まい）座布団があります。')});
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