import Phaser from "./node_modules/phaser";

import GameScene from './scenes/GameScene'

var game;
window.onload = function(){
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'phaser-game',
        scene: [GameScene]
    };
    var game = new Phaser.Game(config);
}