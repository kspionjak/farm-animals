var PreloadState = {

	init: function() {

		// Scale everything
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// Center the game
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

	},

	preload: function() {

		// Load images
		game.load.image('arrow', 'assets/images/arrow.png');
		game.load.image('chicken', 'assets/images/chicken.png');
		game.load.image('horse', 'assets/images/horse.png');
		game.load.image('pig', 'assets/images/pig.png');
		game.load.image('sheep', 'assets/images/sheep.png');

		// Load sounds
		game.load.audio('chickenSound', ['assets/audio/chicken.ogg', 'assets/audio/chicken.mp3']);
		game.load.audio('horseSound', ['assets/audio/horse.ogg', 'assets/audio/horse.mp3']);
		game.load.audio('pigSound', ['assets/audio/pig.ogg', 'assets/audio/pig.mp3']);
		game.load.audio('sheepSound', ['assets/audio/sheep.ogg', 'assets/audio/sheep.mp3']);

	},

	create: function() {

		// Background color
		game.stage.backgroundColor = '#000000';

		// Calling game state
		game.state.start('GameState');
	}

};