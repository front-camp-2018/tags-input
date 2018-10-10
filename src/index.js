'use strict';

const $tagsInput = document.getElementById('tags-input');
const $defaultTagsInput = document.getElementById('default-tags-input');
const $tagsList = document.getElementById('tags-list');
const $defaultTagsList = document.getElementById('default-tags-list');
const tagsArr = ['1', 'super tag'];
const defaultTagsArr = ['div', 'li'];

const createTagElement = content => {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <input type="text" class="edit-input" hidden>
    <span class="remove-btn">x</span>
  `;

  return $li;
};

const createTagItem = (element, target, tagsList, arr) => {
  const isElementExist = arr.includes(target.value);

  if (!isElementExist) {
    tagsList.appendChild(element);
    arr.push(target.value);
    target.value = '';
  }
};

const removeTagElement = (event, arr) => {
  const {target} = event;
  const isRemoveBtn = target.classList.contains('remove-btn');
  const $parentTag = target.parentElement.parentElement;
  const $tag = target.parentElement;

  if (isRemoveBtn) {
    const title = $tag.querySelector('.tag-name').innerText;
    const titleIndex = arr.indexOf(title);

    arr.splice(titleIndex, 1);
    $parentTag.removeChild($tag);
  }
};

$tagsList.addEventListener('click', event => {
  removeTagElement(event, tagsArr);

  const liItem = event.target.parentElement;

  const title = liItem.querySelector('.tag-name');
  const editInput = liItem.querySelector('.edit-input');

  //If you'll click on the span, you will be able to change the name of tag
  //It automatically save when focus will be removed from input
  if (event.target.classList.contains('tag-name')) {
    editInput.value = title.innerHTML;

    editInput.hidden = !editInput.hidden;
    title.hidden = !title.hidden;

    editInput.focus();
  }

  editInput.onblur = e => {
    const indexOfTag = tagsArr.indexOf(title.innerHTML);

    if (e.target.value.trim()) {
      title.innerHTML = e.target.value;
      tagsArr.splice(indexOfTag, 1, title.innerHTML);

      editInput.hidden = true;
      title.hidden = false;
    } else {
      alert('Input some value');
    }
  };
});

$defaultTagsList.addEventListener('click', event => {
  removeTagElement(event, defaultTagsArr);
});

$tagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    createTagItem($el, target, $tagsList, tagsArr);
  }
});

$defaultTagsInput.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value.trim()) {
    const $el = createTagElement(target.value);
    createTagItem($el, target, $defaultTagsList, defaultTagsArr);
  }
});

const init = () => {
  tagsArr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $tagsList.appendChild($el);
  });

  defaultTagsArr.forEach(tagValue => {
    const $el = createTagElement(tagValue);

    $defaultTagsList.appendChild($el);
  });
};

init();
