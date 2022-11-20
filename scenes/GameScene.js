import Phaser from "./node_modules/phaser";

class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene')
    }

    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');

        this.load.spritesheet('player', 'assets/RedHairHighSchooler.png', {frameWidth: 32, frameHeight: 32});
    }

    create(){
        console.log("loaded");
    }
}