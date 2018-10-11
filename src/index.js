'use strict';
//First input variables
const $tagsInput = document.getElementById('tags-input');
const $tagsList = document.getElementById('tags-list');
const tagsArr = [];

//Second input variables
const $tagsInput2 = document.getElementById('tags-input2');
const $tagsList2 = document.getElementById('tags-list2');
const tagsArr2 = ['DefaultTag1', 'DefaultTag2'];

//Input Listener function
const InputEventListener = (TagsInputElement, TagsListElement, TagsArray) => {
  TagsInputElement.addEventListener('keyup', ({key, target}) => {
    TagsInputElement.className = 'tags-input';
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = TagsArray.includes(target.value);
      
      if (!isElementExist) {
        TagsListElement.appendChild($el);
        TagsArray.push(target.value);
        target.value = '';
      }
      else{
        TagsInputElement.className = 'tags-input wrong-input';
      }
    }
  });
};

//Remove listener function
const RemoveEventListener = (TagsListElement, TagsArray) => {
  TagsListElement.addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;
  
    if (isRemoveBtn) {
      $foo.removeChild($tag);
      TagsArray.splice(TagsArray.indexOf($tag.children[0].innerText));
    }
  });
};

//Tags list initiation function
const init = (TagsListElement, TagsArray) => {
  TagsArray.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    TagsListElement.appendChild($el);
  });
};

//Add li function
const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">&#10006</span>
  `;

  return $li;
};

//First Input Listener
InputEventListener($tagsInput, $tagsList, tagsArr);
//Second Input Listener
InputEventListener($tagsInput2, $tagsList2, tagsArr2);
//First tags list remove listener
RemoveEventListener($tagsList, tagsArr);
//Second tags list remove listener
RemoveEventListener($tagsList2, tagsArr2);
//First tags list initiation
init($tagsList, tagsArr);
//Second tags list initiation
init($tagsList2, tagsArr2);
