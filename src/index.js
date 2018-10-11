'use strict';

class TagsInput {
  constructor(parentId, headingText, defaultArr) {
    this.$parent = document.getElementById(parentId);
    this.headingText = headingText;
    this.tagsArr = this.defaultTags(defaultArr);
    this.constructor.counter = (this.constructor.counter || 0) + 1;
    this._id = this.constructor.counter;
  }

  get id() {
    return this._id;
  }

  createTagsInput(){
    const $input = document.createElement('input');
    $input.className = 'tags-input';
    $input.id = 'tags-input-'+ this.id;
    $input.type = 'text';
    $input.placeholder='type your tags...';
    return $input;
  }

  createTagsList(){
    const $ul = document.createElement('ul');
    $ul.className = 'tags-list';
    $ul.id = 'tags-list-'+ this.id;
    return $ul;
  }

  createHeading() {
    const $h2 = document.createElement('h2');
    $h2.className = 'title-level-2';
    $h2.innerHTML = this.headingText;
    return $h2;
  }

  mountElement(){
    this.$tagsInput = this.createTagsInput();
    this.$tagsList = this.createTagsList();
    this.$parent.appendChild(this.createHeading());
    this.$parent.appendChild(this.$tagsInput);
    this.$parent.appendChild(this.$tagsList);
    this.init();
  }

  init () {
    this.fillTagsList();
    this.listeningInput();
    this.listeningRemoveBtn();
  }

  defaultTags (defaultArr) {
    return defaultArr !== undefined ? [...new Set(defaultArr)] : [];
  }

  createTagElement (content) {
    const $li = document.createElement('li');
    $li.className = 'tags-list-item';
    $li.innerHTML = `
      <span class="tag-name">${content}</span>
      <span class="remove-btn">x</span>
    `;
    return $li;
  }

  fillTagsList () {
    this.tagsArr.forEach(tagValue => {
      const $el = this.createTagElement(tagValue);
      this.$tagsList.appendChild($el);
    });
  }

  listeningInput () {
    this.$tagsInput.addEventListener('keyup', ({key, target}) => {
      if (key === 'Enter' && target.value.trim()) {
        const $el = this.createTagElement(target.value),
          isElementExist = this.tagsArr.includes(target.value);
        if (!isElementExist) {
          this.$tagsList.appendChild($el);
          this.tagsArr.push(target.value);
          target.value = '';
        }
      }
    });
  }

  listeningRemoveBtn () {
    this.$tagsList.addEventListener('click', event => {
      const {target} = event,
        isRemoveBtn = target.classList.contains('remove-btn');
      if (isRemoveBtn) {
        const $tagValue = target.previousElementSibling.textContent;
        this.$tagsList.removeChild(target.parentElement);
        this.tagsArr.splice(this.tagsArr.indexOf($tagValue),1);
      }
    });
  }
}

//Example of using

const firstInput = new TagsInput('app','Simple Input');
firstInput.mountElement();
const secondInput = new TagsInput('app','Input with default tags:', ['tag1', 'some awesome tag']);
secondInput.mountElement();