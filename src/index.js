'use strict';

const $tagsInputSimple = document.getElementById('tags-input-simple');
const $tagsListSimple = document.getElementById('tags-list-simple');
const $tagsInputDefault = document.getElementById('tags-input-default');
const $tagsListDefault = document.getElementById('tags-list-default');
const $errorSimple = document.getElementById('error-simple');
const $errorDefault = document.getElementById('error-default');
const tagsArrSimple = [];
const tagsArrDefault = ['1', 'super tag'];

const listen = (input, list, arr, error) => {
	input.addEventListener('keyup', ({key, target}) => {
		const validateRegExp = /(^|\w)([a-zA-Z0-9_-]){0,30}$/g;  

		if (key === 'Enter') {
			if (validateRegExp.test(target.value)){
				error.innerHTML = ''; 
				error.className = 'error';
				
				const $el = createTagElement(target.value);
				const isElementExist = arr.includes(target.value);
				
				if (!isElementExist) {
					list.appendChild($el);
					arr.push(target.value);
					target.value = '';
				} else {
					error.innerHTML = 'Tag is already exist';
					error.className = 'error active';
				}
			} else {
				error.innerHTML = 'Use only a-z, A-Z, 0-9, "_", "-" symbols';
				error.className = 'error active';
			}
		} 
	});

	list.addEventListener('click', event => {
		const {target} = event;
		const isRemoveBtn = target.classList.contains('remove-btn');
		const $foo = target.parentElement.parentElement;
		const $tag = target.parentElement;

		if (isRemoveBtn) {
			$foo.removeChild($tag);
			arr.splice(arr.indexOf($tag.firstElementChild.innerHTML), 1);
		}
	});

	addElement(arr, list);
};

const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;

  return $li;
};

const addElement = (arr, list) => {
  arr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    list.appendChild($el);
  });
};

listen($tagsInputSimple, $tagsListSimple, tagsArrSimple, $errorSimple);
listen($tagsInputDefault, $tagsListDefault, tagsArrDefault, $errorDefault);
