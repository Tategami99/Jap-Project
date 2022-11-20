window.onload = function(){
    var config = {
        type: Phaser.AUTO,
        scale: {
            parent: 'phaser-game',
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: window.innerWidth * window.devicePixelRatio,
            height: window.innerHeight * window.devicePixelRatio,
        },
        scene: [SceneMain]
    };
    var game = new Phaser.Game(config);
}