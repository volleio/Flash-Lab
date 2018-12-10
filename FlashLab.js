function CreateAnimation(animationName, attribute, from, to, duration)
{
	const animation = document.createElement("a-animation");
	animation.classList.add(animationName);
	animation.setAttribute("attribute", attribute);
	if (from)
		animation.setAttribute("from", from);
	animation.setAttribute("to", to);
	animation.setAttribute("dur", duration.toString());
	return animation;
}

function FadeAnimation(opacity, duration)
{
	return CreateAnimation("fade-out-animation", "opacity", null, opacity.toString(), duration);
}

/////////////////////////////////////////////////////////

const scene = document.getElementById("Scene");
const cursor = document.getElementById("Cursor");
const mainScreen = document.getElementById("MainScreen");
// const musicMenuButton = document.getElementById("MusicMenuButton");
// const musicMenuButtonImage = document.getElementById("MusicMenuButtonImage");
const webcam = document.getElementById("Webcam");

const splashScreen = document.getElementById("SplashScreen");
const startButton = document.getElementById("StartButton");
const startButtonText = document.getElementById("StartButtonText");

const directionsScreen = document.getElementById("DirectionsScreen");
const continueButton = document.getElementById("ContinueButton");
const continueButtonText = document.getElementById("ContinueButtonText");

const slideImage = document.getElementById("SlideImage");

//scene.renderer.sortObjects = true;

window.setTimeout(() =>
{
	startButton.addEventListener("mouseenter", () =>
	{
		const focusAnimation = CreateAnimation("focus-animation", "color", "#323232", "#980000", 1500);
		startButton.appendChild(focusAnimation);
		startButton.setAttribute("opacity", "1");
		
		startButton.addEventListener("mouseleave", () => 
		{
			const focusAnimation = startButton.querySelector(".focus-animation");
			if (focusAnimation)
				focusAnimation.remove();
	
			startButton.setAttribute("color", "#323232");
			startButton.setAttribute("opacity", "0.5");
		});
	});
}, 6500);

startButton.addEventListener("click", () =>
{
	// Hide button and fade out current screen
	startButtonText.object3D.visible = false;
	startButton.object3D.visible = false;
	for (let child of splashScreen.children)
		child.appendChild(FadeAnimation(0, 500));

	// Hide screen and fade in next screen
	window.setTimeout(() =>
	{
		splashScreen.object3D.visible = false;
		directionsScreen.object3D.visible = true;
		for (let child of directionsScreen.children)
			child.emit("fadeInDirections");

		const redLights = document.querySelectorAll(`a-light`);
		redLights.forEach((redLight) => redLight.emit("raiseRedLights"));
	}, 500)

	SetupDirectionsScreen();
});

function SetupDirectionsScreen()
{
	// Add continue button mouseenter event once screen has loaded 
	window.setTimeout(() => 
	{
		continueButton.addEventListener("mouseenter", () =>
		{
			const focusAnimation = CreateAnimation("focus-animation", "color", "#323232", "#980000", 1500);
			continueButton.appendChild(focusAnimation);
			continueButton.setAttribute("opacity", "1");
			
			continueButton.addEventListener("mouseleave", () => 
			{
				const focusAnimation = continueButton.querySelector(".focus-animation");
				if (focusAnimation)
					focusAnimation.remove();
		
				continueButton.setAttribute("color", "#323232");
				continueButton.setAttribute("opacity", "0.5");
			});
		});

	}, 6500);
	
	continueButton.addEventListener("click", () =>
	{
		continueButton.object3D.visible = false;
		continueButtonText.object3D.visible = false;
		for (let child of directionsScreen.children)
			child.appendChild(FadeAnimation(0, 500));

		directionsScreen.appendChild(FadeAnimation(0,500));
		// musicMenuButton.appendChild(FadeAnimation(0,500));
		// musicMenuButtonImage.appendChild(FadeAnimation(0,500));
		mainScreen.appendChild(FadeAnimation(0,500));
		cursor.object3D.visible = false;

		const redLights = document.querySelectorAll(`a-light[color="#BE0000"]`);
		redLights.forEach((redLight) => redLight.emit("lowerRedLights"));

		window.setTimeout(() => 
		{
			for (let child of directionsScreen.children)
			{
				if (child.object3D)
					child.object3D.visible = false;
			}

			directionsScreen.object3D.visible = false;
			// musicMenuButton.object3D.visible = false;
			// musicMenuButtonImage.object3D.visible = false;
			mainScreen.object3D.visible = false;
			// webcam.object3D.visible = true;			
		}, 500)

		window.setTimeout(() => 
		{
			this.ShowSlide("slide", 14, 1, 10000, 100);
		}, 20000);
	});
}

function ShowSlide(imagePrefix, numSlides, currentSlide, pauseTime, flashTime)
{
	slideImage.object3D.visible = true;

	window.setTimeout(() => {
		slideImage.object3D.visible = false;
		slideImage.setAttribute("src", "#" + imagePrefix + currentSlide);

		if (currentSlide < numSlides)
		{
			window.setTimeout(() => {
				this.ShowSlide(imagePrefix, numSlides, currentSlide++, pauseTime, flashTime);			
			}, pauseTime);
		}
	}, flashTime);
}