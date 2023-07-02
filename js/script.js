// Меню

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener ("click", function(e){
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


const menuLinks = document.querySelectorAll('.goto[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick)
	});

	function onMenuLinkClick(e){
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;
			
			if(iconMenu.classList.contains('_active')){
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}
			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth'
			});
			e.preventDefault();
		}
	}
}

// Нажатие на боковое меню
let dots = document.querySelectorAll('.goto');
let active = document.querySelector('.goto.active') || dots[0];

for (let i = 0; i < dots.length; i++) {
   dots[i].addEventListener('click', toggleActive);
}

function toggleActive() {
   active.classList.remove('active');
   this.classList.add('active');

   active = this;
}

// Паралллакс 
window.onload = function () {
	const parallax = document.querySelector('.parallax');
	if (parallax) {
		const content = document.querySelector ('.parallax__container');
		const clouds = document.querySelector('.images-parallax__clouds');
		const mountains = document.querySelector('.images-parallax__mountains');
		const human = document.querySelector('.images-parallax__human');

		const forClouds = 40;
		const forMountains = 20;
		const forHuman = 10;

		//Скорость анимации
		const speed = 0.05;

		let positionX = 0, positionY = 6;
		let coordXprocent = 0, coordYprocent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			// Передача стилей 
			clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
			mountains.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%) ;`;
			human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		}
		setMouseParallaxStyle();

		parallax.addEventListener('mousemove', function (e){
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;	

			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});

		// Параллакс при скролле 
		let thresholdSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (entries, observer) {
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
			setParallaxItemsStyle(scrollTopProcent) ;
		};
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets
		}); 

		observer .observe(document.querySelector('.content'));

		function setParallaxItemsStyle(scrollTopProcent) {
			content.style.cssText = `transform: translate(@%,-${scrollTopProcent / 9}%);`;
			mountains.parentElement.style.cssText = `transform: translate(@%,-${scrollTopProcent / 6}%);`;
			human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
		}
	}
}








