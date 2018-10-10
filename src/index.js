'use strict';
// В якості покращення роботи бібліотеки "tags-input запропоновано
// впордкування за алфавітом введених тегів

tagInputArea(
  document.getElementById('tags-input-1'),
  document.getElementById('tags-list-1'),
  []
);

tagInputArea(
  document.getElementById('tags-input-2'),
  document.getElementById('tags-list-2'),
  ['3', '1', 'tag 1', 'super tag']
);

function tagInputArea($tagsInput, $tagsList, tagsArr) {
  $tagsInput.addEventListener('keyup', ({key, target}) => {
    if (key === 'Enter' && target.value.trim()) {
      const $el = createTagElement(target.value);
      const isElementExist = tagsArr.includes(target.value);

      if (!isElementExist) {
        var minIndex = 0;
        tagsArr.forEach((item, i) => {
          if (target.value >= item) {
            minIndex = i + 1;
          }
        });

        $tagsList.insertBefore($el, $tagsList.childNodes[minIndex]);
        tagsArr.splice(minIndex, 0, target.value);
        target.value = '';
      }
    }
  });

  $tagsList.addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;

    if (isRemoveBtn) {
      $foo.removeChild($tag);
      tagsArr.splice(tagsArr.indexOf($tag.firstElementChild.innerHTML), 1);
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

  const init = () => {
    tagsArr.sort().forEach(tagValue => {
      const $el = createTagElement(tagValue);
      $tagsList.appendChild($el);
    });
  };

  init();
  return;
}


