var GameState = {

	create: function() {

		// Group for animals
		var animalData = [
			{key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'},
			{key: 'horse', text: 'HORSE', audio: 'horseSound'},
			{key: 'pig', text: 'PIG', audio: 'pigSound'},
			{key: 'sheep', text: 'SHEEP', audio: 'sheepSound'}
		];

		// Group to store all animals
		this animals = this.game.add.group();

		var self = this;
		var animal;

		animalData.forEach( function(element) {
			// Create each animal and save it's properties
			animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);

			// Saving everything that's not Phaser-related in an object
			animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};

			// Anchor point to the center
			animal.anchor.setTo(0.5);

			// Enable input
			animal.inputEnabled = true;
			animal.input.pixelPerfectClick = true;
			animal.events.onInputDown.add(self.animateAnimal, this);
		});

		// Left arrow
		this.leftArrow = this.game.add.sprite(30, this.game.world.centerY, 'arrow');
		this.leftArrow.anchor.setTo(0.5);
		this.leftArrow.scale.x = -1;
		this.leftArrow.customParams = {direction: -1};

		// Left arrow user input
		this.leftArrow.inputEnabled = true;
		this.leftArrow.input.pixelPerfectClick = true;
		this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

		// Right arrow
		this.rightArrow = this.game.add.sprite(610, this.game.world.centerY, 'arrow');
		this.rightArrow.anchor.setTo(0.5);
		this.rightArrow.customParams = {direction: 1};

		// Right arrow user input
		this.rightArrow.inputEnabled = true;
		this.rightArrow.input.pixelPerfectClick = true;
		this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

	},

	update: function() {

	},

	animateAnimal: function() {
		sprite.play('animate');
		sprite.customParams.sound.play();
	},

	switchAnimal: function(sprite, event) {

		// If an animation is taking place don't do anything
		if (this.isMoving) {
			return false;
		}

		this.isMoving = true;

		// Hide text
		this.animalText.visible = false;

		var newAnimal, endX;

		// According to the arrow they pressed, animal comes in
		if (sprite.customParams.direction > 0) {
			newAnimal = this.animals.next();
			newAnimal.x = -newAnimal.width/2;
			endX = 640 + this.currentAnimal.width/2;
		} else {
			newAnimal = this.animals.previous();
			newAnimal.x = 640 + newAnimal.width/2;
			endX = -this.currentAnimal.width/2;
		}

		// Tween animations, moving on x
		var newAnimalMovement = game.add.tween(newAnimal);
		newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
		newAnimalMovement.onComplete.add( function() {
			this.isMoving = false;

			// Show text
			this.showText(newAnimal);
		}, this);

		newAnimalMovement.start();

		var currentAnimalMovement = game.add.tween(this.currentAnimal);
		currentAnimalMovement.to({ x: endX }, 1000);
		currentAnimalMovement.start();

		this.currentAnimal = newAnimal;
	},

	showText: function(animal) {
		// Create the text object if it doesn't exist
		if (!this.animalText) {
			var style = {font: "bold 30pt Arial", fill: "#D0171B", align: "center"};
			this.animalText = this.game.add.text(this.game.width/2, this.game.height * 0.85, 'asdfasfd', style);
			
			// Anchor text to the center
			this.animalText.anchor.setTo(0.5);
		}

		this.animalText.setText(animal.customParams.text);
		this.animalText.visible = true;
	}

};