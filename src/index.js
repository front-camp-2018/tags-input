'use strict';
//add alert "Such tag is already exist."
//add restriction of the duration of the tag (15 symbols)
//and alert about too long tag.

function TagInput(inputCss, savedTags = []) {
  this.$tagsInput = document.querySelector(inputCss);
  this.$tagsList = this.$tagsInput.nextSibling.nextSibling;
  this.tagsArr = savedTags;

  this.$tagsInput.addEventListener('keyup', ({key, target}) => {
    const tagLangth = target.value.length;
    if(tagLangth > 15) {
      alert("Tag is longer than 15 symbols, be short.");
    };
    if (key === 'Enter' && target.value.trim() && tagLangth <= 15) {
      const $el = this.createTagElement(target.value);
      const isElementExist = this.tagsArr.includes(target.value);

      if (!isElementExist) {
        this.$tagsList.appendChild($el);
        this.tagsArr.push(target.value);
        target.value = '';
      } else {
        alert("Such tag is already exist.");
      }
    }
  });

  this.$tagsList.addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const $foo = target.parentElement.parentElement;
    const $tag = target.parentElement;
    const $tagText = $tag.children[0];

    if (isRemoveBtn) {
      const tagText = $tagText.innerText;
      this.tagsArr.splice(this.tagsArr.indexOf(tagText), 1);

      $foo.removeChild($tag);

        // TODO: remove element from array
        // tagsArr.splice();
    }   
  });
};   
  
TagInput.prototype.createTagElement = function(content) {
  const $li = document.createElement('li');

  $li.className = 'tags-list-item';
  $li.innerHTML = `
    <span class="tag-name">${content}</span>
    <span class="remove-btn">x</span>
  `;
  
  return $li;
};

TagInput.prototype.init = function() {
  this.tagsArr.forEach(tagValue => {
    const $el = this.createTagElement(tagValue);

    this.$tagsList.appendChild($el);
  });
};