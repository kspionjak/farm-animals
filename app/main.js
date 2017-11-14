// Initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

// Setup all game states
game.state.add('PreloadState', PreloadState);
game.state.add('GameState', GameState);

// Calling preload state
game.state.start('PreloadState');
