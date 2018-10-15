'use strict';

class TagsInput {
  constructor(id, defaultTagsArr = []) {
    this.$tagsInput = document.getElementById(id);
    this.$tagsList = document.getElementById(id).nextElementSibling;
    this.defaultTagsArr = defaultTagsArr;

    this.attachListeners();
    this.initDefaultList();
    this.divError = this.createDivError();
  }

  static createTagElement(content) {
    const $li = document.createElement('li');

    $li.className = 'tags-list-item';
    $li.innerHTML = `
      <span class="tag-name">${content}</span>
      <span class="remove-btn">x</span>
    `;

    return $li;
  }

  createDivError() {
    const $div = document.createElement('div');
    $div.textContent = 'This value is already in the list!';
    $div.style.visibility = 'hidden';
    $div.style.color = 'red';
    $div.style.marginBottom = '3px';
    this.$tagsInput.parentElement.insertBefore($div, this.$tagsInput);

    return $div;
  }

  attachListeners() {
    this.$tagsInput.addEventListener('keyup', e => this.onKeyUp(e));
    this.$tagsList.addEventListener('click', e => this.onClick(e));
  }

  onClick({target}) {
    const isRemoveBtn = target.classList.contains('remove-btn');

    if (isRemoveBtn) {
      const $tag = target.parentElement;
      const tagIndex = Array.prototype.indexOf.call(this.$tagsList.children, $tag);

      if (parseInt(this.$tagsInput.value) === parseInt(this.defaultTagsArr[tagIndex])) {
        this.divError.style.visibility = 'hidden';
      }

      this.$tagsList.removeChild($tag);

      // TODO: remove element from array
      this.defaultTagsArr.splice(tagIndex, 1);
    }
  }

  onKeyUp({key, target}) {
    if (!this.defaultTagsArr.includes(target.value.trim())) {
      this.divError.style.visibility = 'hidden';

      if (key === 'Enter') {
        const $el = TagsInput.createTagElement(target.value);
        this.$tagsList.appendChild($el);
        this.defaultTagsArr.push(target.value);

        target.value = '';
      }
    } else {
      this.divError.style.visibility = 'visible';
    }
  }

  initDefaultList() {
    this.defaultTagsArr.forEach(tagValue => {
      const $li = TagsInput.createTagElement(tagValue);
      this.$tagsList.appendChild($li);
    });
  }
}

new TagsInput('tags-input', []);
new TagsInput('default-tags-input', ['1', '2']);


