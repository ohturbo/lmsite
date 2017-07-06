'use strict';

var selectButton = document.querySelector('#next-button');

// MISC FUNCTIONS AND VARIABLES

var categories = document.querySelectorAll('.category');

function updateSliderRange(slider, min, max) {
	slider.noUiSlider.updateOptions({
		range: {
			'min': min,
			'max': max
		}
	});
}

// PREVENT IOS BOUNCE - NOT PERFECT
var content = document.getElementById('avatar-view');
content.addEventListener('touchstart', function(event) {
    this.allowUp = (this.scrollTop > 0);
    this.allowDown = (this.scrollTop < this.scrollHeight - this.clientHeight);
    this.slideBeginY = event.pageY;
});

content.addEventListener('touchmove', function(event) {
    var up = (event.pageY > this.slideBeginY);
    var down = (event.pageY < this.slideBeginY);
    this.slideBeginY = event.pageY;
    if ((up && this.allowUp) || (down && this.allowDown)) {
        event.stopPropagation();
    }
    else {
        event.preventDefault();
    }
});

// FAST CLICK
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

// BACKGROUND CONTROL MAYBE REFACTOR THIS
var avatarView = document.querySelector('#avatar-view');
var bgButton = document.querySelector('.bg-change');

var bgNumber = 0;
bgButton.addEventListener('click', function () {
	if (bgNumber == 0) {
		avatarView.style.backgroundImage = 'url(assets/UI/bg1.png)';
		bgNumber = 1;
	} else if (bgNumber == 1) {
		avatarView.style.backgroundImage = 'url(assets/UI/bg2.png)';
		bgNumber = 2;
	} else if (bgNumber == 2) {
		avatarView.style.backgroundImage = 'url(assets/UI/bg0.png)';
		bgNumber = 0;
	}
})

// COLOR ADJUST CONTROL
var colorAdjuster = document.getElementById('color-slider');
noUiSlider.create(colorAdjuster, {
	start: -60,
	range: {
		'min': [-60],
		'max': [410]
	},
	direction: 'rtl',
	padding: 60,
	orientation: 'vertical'
});

// SCALE AND COLOR CONTROL
var scaler = document.getElementById('scaler');

var currentItem = document.querySelector('#worn-top');

noUiSlider.create(scaler, {
	start: 0,
	range: {
		'min': [0.5],
		'max': [1.5]
	},
	direction: 'rtl',
	padding: .15,
	orientation: 'vertical'
});
var blackColor = document.querySelector('#black');
var whiteColor = document.querySelector('#white');

var scalable = document.querySelectorAll('.scalable');

Array.from(categories).forEach(function (category) {
	category.addEventListener('click', function () {
		currentItem = document.querySelector('#worn-' + category.dataset.category.slice(0, -1));

		if (category.classList.contains('bw-able')) {
			blackColor.style.display = 'block';
			whiteColor.style.display = 'block';
		} else {
			blackColor.style.display = 'none';
			whiteColor.style.display = 'none';
		}

		if (category.classList.contains('color-adjustable')) {
			if (!currentItem.style.filter) {
				currentItem.style.filter = 'hue-rotate(0deg)';
			}
			colorAdjuster.classList.add('slider-active');
			colorAdjuster.noUiSlider.set(currentItem.style.filter.match(/\d+[.]*\d*/)[0]);
		} else {
			colorAdjuster.classList.remove('slider-active');
		}

		if (category.classList.contains('scalable')) {
			if (!currentItem.style.transform) {
				currentItem.style.transform = 'scale(1)';
			}
			scaler.classList.add('slider-active');
			scaler.noUiSlider.set(currentItem.style.transform.match(/\(([^)]+)\)/)[1]);
		} else {
			scaler.classList.remove('slider-active');
		}
	});

	blackColor.addEventListener('click', function () {
		currentItem.style.filter = 'grayscale(200%) brightness(0.5)';
		hairBacking.style.filter = 'grayscale(200%) brightness(0.5)';
	});

	whiteColor.addEventListener('click', function () {
		currentItem.style.filter = 'grayscale(2) brightness(190%)';
		hairBacking.style.filter = 'grayscale(2) brightness(190%)';
	});

	colorAdjuster.noUiSlider.on('slide', function () {
		currentItem.style.filter = 'hue-rotate(' + colorAdjuster.noUiSlider.get() + 'deg)';
		hairBacking.style.filter = 'hue-rotate(' + colorAdjuster.noUiSlider.get() + 'deg)';
	});

	category.addEventListener('click', function () {
		if (currentItem.id == 'worn-eye') {
			updateSliderRange(scaler, 0.5, 1.3);
			scaler.noUiSlider.on('slide', function () {
				currentItem.style.transform = 'scale(' + scaler.noUiSlider.get() + ')';
			});
		} else if (currentItem.id == 'worn-eyebrow') {
			updateSliderRange(scaler, 0.5, 1.2);
			scaler.noUiSlider.on('slide', function () {
				currentItem.style.transform = 'scale(' + scaler.noUiSlider.get() + ')';
			});
		} else {
			updateSliderRange(scaler, 0.5, 1.5);
			scaler.noUiSlider.on('slide', function () {
				currentItem.style.transform = 'scale(' + scaler.noUiSlider.get() + ')';
			});
		}
	});
})

// CATEGORY CONTROL
var itemViews = document.querySelectorAll('#item-view');

var selectedCategory = '';
Array.from(categories).forEach(function (category) {
	category.addEventListener('click', function () {
		categories.forEach(function (sibling) {
			sibling.classList.remove('category-selected');
		});
		category.classList.add('category-selected');
		selectedCategory = category.dataset.category;

		itemViews.forEach(function (itemView) {
			itemView.classList.remove('open-items');
			if (category.dataset.category == itemView.dataset.category) {
				itemView.classList.add('open-items');
			}
		});
	});
}

// ITEM CONTROL
);var itemCategories = ['skin', 'top', 'bottom', 'shoe', 'hair', 'eye', 'nose', 'mouth', 'eyebrow', 'spectacle', 'facehair','head'];
var noItem = document.querySelector('.no-item');

Array.from(itemCategories).forEach(function (item) {
	var wornItem = document.querySelector('#worn-' + item);
	var category = document.querySelectorAll('.' + item + 's');
	for (var i = 0; i < category.length; i++) {
		category[i].style.backgroundImage = 'url(images/items/' + item + 's/' + item + i + '.png)';
	}
	var selectedItem = '';
	category.forEach(function (item) {
		item.addEventListener('click', function () {
			if (item.classList.contains('no-item')) {
				wornItem.style.display = 'none';
			} else {
				wornItem.style.display = 'block';
			}
			category.forEach(function (sibling) {
				sibling.classList.remove('item-selected');
			});
			item.classList.add('item-selected');
			selectedItem = item.dataset.itemnumber;
			if (!item.classList.contains('no-item') && wornItem.classList.contains('skinnable')) {
				wornItem.src = 'images/items/' + wornItem.dataset.category + 's/' + wornItem.dataset.category + currentSkin + selectedItem + '.png';
			} else {
				wornItem.src = 'images/items/' + wornItem.dataset.category + 's/' + wornItem.dataset.category + selectedItem + '.png';
			}
		});
	});
});

// HAIR CONTROL
var currentHair = ''
var hairBacking = document.querySelector('#hair-backing')

var hairs = document.querySelectorAll('.hairs')

Array.from(hairs).forEach(function(hair){
	hair.addEventListener('click', function(){
		var currentHair = document.querySelector('#worn-hair').src.match(/\d.png/)[0]
		if (currentHair[0] === '1' ){
			hairBacking.src = "images/items/hairs/hairb1.png"
		} else if (currentHair[0] === '4') {
			hairBacking.src = "images/items/hairs/hairb4.png"
		} else {
			hairBacking.src = "";
		}
	})
})







// SKIN CONTROL
var currentSkin = ''
var skins = document.querySelectorAll('.skins');
Array.from(skins).forEach(function(skin){
	skin.addEventListener('click', function(){
		var headNumber = document.querySelector("#worn-head").src.match(/\d.png/)[0]
		if (skin.style.backgroundImage.includes("skin1")){
			document.querySelector('#worn-head').src = "images/items/heads/headb" + headNumber[0] + ".png"
			currentSkin = 'b';
		} else if (skin.style.backgroundImage.includes("skin0")){
			document.querySelector('#worn-head').src = "images/items/heads/head" + headNumber[0] + ".png"
			currentSkin = '';
		} else if (skin.style.backgroundImage.includes("skin2")){
			document.querySelector('#worn-head').src = "images/items/heads/headc" + headNumber[0] + ".png"
			currentSkin = 'c';
		} else if (skin.style.backgroundImage.includes("skin3")){
			document.querySelector('#worn-head').src = "images/items/heads/headd" + headNumber[0] + ".png"
			currentSkin = 'd';
		}
	})
})


document.querySelector('#headCategory').addEventListener('click', function(){
	var skinableCategory = document.querySelectorAll('.heads')
	itemCategories.forEach(function (item) {
		for (var i = 0; i < skinableCategory.length; i++) {
			skinableCategory[i].style.backgroundImage = 'url(images/items/' + item + 's/' + item + currentSkin + i + '.png)';
		}
	 })
})

document.querySelector('.nose-button').addEventListener('click', function(){
	var noses = document.querySelectorAll('.noses');
	for (var i = 0; i < noses.length; i++){
		if ( currentSkin == '' || currentSkin == 'b' ){
			noses[i].style.backgroundImage = 'url(images/items/noses/nose' + i + '.png)'
		} else if (currentSkin == 'c' || currentSkin == 'd' ){
			noses[i].style.backgroundImage = 'url(images/items/noses/noseb' + i + '.png)'
		}
	}
})

var currentNose = '';
document.querySelectorAll('.skins').forEach(function(skin){
	skin.addEventListener('click', function(){
		currentNose = document.querySelector('#worn-nose').src.match(/\d.png/)[0]
		if (currentSkin === '' || currentSkin === 'b' ){
			document.querySelector('#worn-nose').src = 'images/items/noses/nose' + currentNose[0] + '.png'
		} else if (currentSkin === 'c' || currentSkin === 'd' ){
			document.querySelector('#worn-nose').src = 'images/items/noses/noseb' + currentNose[0] + '.png'
		} 
	})
})

document.querySelectorAll('.noses').forEach(function(nose){
	nose.addEventListener('click', function(){
		var currentNose = document.querySelector('#worn-nose').src.match(/\d.png/)[0]
		if (currentSkin === '' || currentSkin === 'b' ){
			document.querySelector('#worn-nose').src = 'images/items/noses/nose' + currentNose[0] + '.png'
		} else if (currentSkin ==='c' || currentSkin === 'd' ){
			document.querySelector('#worn-nose').src = 'images/items/noses/noseb' + currentNose[0] + '.png'
		} else { console.log("UH OH!")}
	})
})
