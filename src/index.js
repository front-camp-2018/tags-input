'use strict';
const TagInput = class {
  constructor(inputId, defaultTags = []) {

    this.$tagsInput = document.getElementById(inputId);
    this.$tagsList = this.$tagsInput.nextSibling.nextSibling;
    this.tagsArr = defaultTags;
    this.$inputWrapper = this.$tagsInput.parentElement;

    this.$tagsInput.addEventListener('keyup', ({key, target}) => {
      if (key === 'Enter' && target.value.trim()) {
        const $el = this.createTagElement(target.value);
        const isElementExist = this.tagsArr.includes(target.value);

        if (isElementExist) {
          const errorMessage = 'This tag already exists!';
          const errorNode = document.createTextNode(errorMessage);
          const showError = () => {
            document.getElementById('app').insertBefore(errorNode, this.$inputWrapper);
            setTimeout(function(){
              errorNode.remove();
            }, 4000);
          };
          showError();
          target.value = '';
        }

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
      const $ul = target.parentElement.parentElement;
      const $tag = target.parentElement;

      if (isRemoveBtn) {
        const tagName = target.previousSibling.previousSibling.innerText;
        $ul.removeChild($tag);
        this.tagsArr.splice(this.tagsArr.indexOf(tagName), 1);
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
