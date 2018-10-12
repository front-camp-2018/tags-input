'use strict';

const $app = document.getElementById('app');
const $tagsList = document.getElementById('tags-list');
const $tagsList2 = document.getElementById('tags-list2');
const $colorPick1 = document.getElementById('color-pick1');
const $colorPick2 = document.getElementById('color-pick2');
const tagsArr = [];
const tagsArr2 = ['some', 'default', 'tags'];

$app.addEventListener('keyup', ({key, target}) => {
	if (key === 'Enter' && target.value.trim()) {
  	let inputId = event.target.id;
  	let tVal = target.value;

  	if(inputId === 'tags-input'){
  		var currentTagsList = $tagsList;
  		var isElementExist = tagsArr.includes(tVal);
  		var currentColor = $colorPick1.value;
  	}else{
  		var currentTagsList = $tagsList2;
  		var isElementExist = tagsArr2.includes(tVal);
  		var currentColor = $colorPick2.value;
  	}
 	// 	let currentTagsList = inputId === 'tags-list' ? $tagsList : $tagsList2;                              
 	// 	let isElementExist = inputId === 'tags-list' ?  tagsArr.includes(tVal) : tagsArr2.includes(tVal);
	// 	let currentColor = inputId === 'tags-list' ? $colorPick1.value : $colorPick2.value;
 	//	console.log(inputId);             // id інпуту правильний а  currentTagsList виходить другий так ніби таргетом є другий інпут а не перший
	// 	console.log(currentTagsList);

    if (!isElementExist) {
    	const $el = createTagElement(tVal);
    	$el.style.backgroundColor = currentColor;
    	currentTagsList.appendChild($el);
		currentTagsList == $tagsList ? tagsArr.push(tVal):tagsArr2.push(tVal);
    	target.value = '';
    }
  }
});

$app.addEventListener('click', event => {
	const {target} = event;
	const isRemoveBtn = target.classList.contains('remove-btn');
	const $foo = target.parentElement.parentElement;
	const $tag = target.parentElement;
	const tagValue = target.parentElement.childNodes[1].textContent; 
	if (isRemoveBtn) {
    	$foo.removeChild($tag);
    	if($foo.id === 'tags-list'){
    		let killme = tagsArr.indexOf(tagValue);
    		tagsArr.splice(killme, 1);
    	}else{
    		let killme = tagsArr2.indexOf(tagValue);
    		tagsArr2.splice(killme, 1);
    	}
  	}
});

const createTagElement = content => {
  const $li = document.createElement('li');
  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;
  return $li;
};

const createDefaultTags = () => {
  tagsArr2.forEach(tagValue => {
    const $el = createTagElement(tagValue);
    $tagsList2.appendChild($el);
  });
};

createDefaultTags();
