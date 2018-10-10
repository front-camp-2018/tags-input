'use strict';

const _addInputListener = Symbol('addInputListener');
const _addDeleteListener = Symbol('addDeleteListener');
const _createTagElement = Symbol('createTagElement');
const _init = Symbol('init');

class tagsApp {
  constructor($tagsInput,$tagsList,defaultTags){
    this.$tagsInput = $tagsInput;
    this.$tagsList = $tagsList;
    if(!defaultTags) this.tagsArr=[];
    else this.tagsArr=[...defaultTags];

    this[_addInputListener]();
    this[_addDeleteListener]();

    if(defaultTags) this[_init]();
  }
  [_addInputListener](){
    this.$tagsInput.addEventListener('keyup', ({key, target}) => {
      this.$tagsInput.style.outline='none';
      if (key === 'Enter' && target.value.trim()) {
        const $el = this[_createTagElement](target.value);
        const isElementExist = this.tagsArr.includes(target.value.trim());
        if (!isElementExist) {
          this.$tagsList.appendChild($el);
          this.tagsArr.push(target.value.trim());
          target.value = '';
        } else {
          this.$tagsInput.style.outline='3px solid red';
        }
      }
    });
  }
  [_addDeleteListener](){
    this.$tagsList.addEventListener('click', event => {
      const {target} = event;
      const isRemoveBtn = target.classList.contains('remove-btn');
      const $foo = target.parentElement.parentElement;
      const $tag = target.parentElement;
    
      if (isRemoveBtn) {
        $foo.removeChild($tag);
        this.tagsArr.splice(this.tagsArr.indexOf( $tag.children[0].textContent),1);
      }
    });
  }
  [_createTagElement](content){
    const $li = document.createElement('li');
    $li.className = 'tags-list-item';
    $li.innerHTML = `
      <span class="tag-name">${content}</span>
      <span class="remove-btn">x</span>
    `;
    return $li;
  }
  [_init](){
    this.tagsArr.forEach(tagValue => {
      const $el = this[_createTagElement](tagValue);
      this.$tagsList.appendChild($el);
    });
  }
}
export default tagsApp;