'use strict';

// need to add some restrict of the langth of tags
// add error "tag is already exist"

const TagInput = class {
  constructor(inputCss, savedTags = []) {
    this.$tagsInput = document.querySelector(inputCss);
    this.$tagsList = this.$tagsInput.nextSibling.nextSibling;
    this.tagsArr = savedTags;

    this.$tagsInput.addEventListener('keyup', ({key, target}) => {
      if (key === 'Enter' && target.value.trim()) {
        const $el = this.createTagElement(target.value);
        const isElementExist = this.tagsArr.includes(target.value);

        if (!isElementExist) {
          this.$tagsList.appendChild($el);
          this.tagsArr.push(target.value);
          target.value = '';
        }
      }
    });

    this.$tagsList.addEventListener('click', event => {
      const {target} = event;
      const isRemoveBtn = target.classList.contains('remove-btn');
      const $foo = target.parentElement.parentElement;
      const $tag = target.parentElement;

      if (isRemoveBtn) {
        const tagText = $tag.children[0].innerText;
        this.tagsArr.splice(this.tagsArr.indexOf(tagText), 1);

        $foo.removeChild($tag);

        // TODO: remove element from array
        // tagsArr.splice();
      }
    });
  }
  createTagElement(content) {
    const $li = document.createElement('li');

    $li.className = 'tags-list-item';
    $li.innerHTML = `
      <span class="tag-name">${content}</span>
      <span class="remove-btn">x</span>
    `;

    return $li;
  }

  init() {
    this.tagsArr.forEach(tagValue => {
      const $el = this.createTagElement(tagValue);

      this.$tagsList.appendChild($el);
    });
  }
};