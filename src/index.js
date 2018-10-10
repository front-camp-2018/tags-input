'use strict';

const $tagsInput = document.getElementById('tags-input');
const $tagsList = document.getElementById('tags-list');
const $similarTagList = document.getElementById('similar-tag-list');
const $warning = document.getElementById('warning');
const tagsArr = ['1', 'super tag'];

$tagsInput.addEventListener('keyup', ({key, target}) => {
  if (!$warning.hidden)  $warning.hidden = true;
  let similarTagsList = similarTags(unifyTag(target.value));
  if ( similarTagsList ) {
    $similarTagList.innerHTML = `<strong>Similar tags:</strong> ${similarTagsList}`;
  }  else {
    if ($similarTagList.innerHTML) $similarTagList.innerHTML = '';
  }

  if (key === 'Enter' && target.value.trim()) {
    let tagValue = unifyTag(target.value);
    const isElementExist = tagsArr.includes(tagValue);

    if (!isElementExist) {
      const $el = createTagElement(tagValue);
      tagsArr.push(tagValue);
      tagsArr.sort();
      const ind = tagsArr.indexOf(tagValue);
      $tagsList.insertBefore($el, $tagsList.children[ind]);
      clearInputs();
    } else {
      $warning.hidden = false;
    }
  }
  if (key === 'Escape') {
    clearInputs();
  }
});

$tagsList.addEventListener('click', ({target}) => {
  const isRemoveBtn = target.classList.contains('remove-btn');
  if (isRemoveBtn) {
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;
    const tagContent = target.previousElementSibling.textContent;
    $foo.removeChild($tag);
    tagsArr.splice(tagsArr.indexOf(tagContent), 1);
  }
});

const unifyTag = str => str.trim().toLowerCase();

const similarTags = str => {
  if (str) {
    return tagsArr.filter( tag => tag.includes(str)).join(', ');
  }
};

const clearInputs = () => {
  $tagsInput.value = '';
  $similarTagList.innerHTML ='';
  $warning.hidden = true;
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

const init = () => {
  tagsArr.sort().forEach(tagValue => {
    const $el = createTagElement(unifyTag(tagValue));
    $tagsList.appendChild($el);
  });
};

init();
