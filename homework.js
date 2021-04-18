import images from "./gallery-items.js";

const galleryList = document.querySelector('ul.js-gallery'),
      lightBox = document.querySelector('.js-lightbox'),
      btn = document.querySelector('[data-action="close-lightbox"]'),
      overlayEl = document.querySelector('.lightbox__overlay'),
      boxContent = document.querySelector('.lightbox__content'),
      lightBoxImg = document.querySelector('.lightbox__image');
const creategalleryItem = images.map(({ preview, original, description }) => {
  return `<li class="gallery__item">
      <a class="gallery__link"
      href="${original}">
    <img loading="lazy"
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li >
  `;
})
  .join('');

galleryList.innerHTML = creategalleryItem;

const imgEl = document.querySelector('.gallery__image');

galleryList.addEventListener('click', onClickLightbox);

function onClickLightbox(event) {
  event.preventDefault();
  window.addEventListener('keydown', onCloseEsc);
  
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  let element;
  const targetAlt = event.target.alt;
    for (let i = 0; i < images.length; i++) {
      if (images[i].description === targetAlt) {
         element = images[i].original;
      }
    }
  lightBox.classList.add('is-open');

  boxContent.innerHTML = `<img class="lightbox__image"
    src="${element}"
    alt="${targetAlt}"
  />`;
  document.body.style.overflow = 'hidden';
};

function onCloseLightbox() {
    window.removeEventListener('keydown', onCloseEsc);
    lightBox.classList.remove('is-open');
    lightBoxImg.alt = '';
    lightBoxImg.src = '';
    document.body.style.overflow = '';
};

function onCloseModal(event) {
  if (overlayEl === event.target) {
    onCloseLightbox();
  }
};

function onCloseEsc(event) {
    if (event.code === "Escape") {
    onCloseLightbox();
  }
  
};

function onFlippingBtn(e) {
  const lightBoxImg = document.querySelector('.lightbox__image');

  if (lightBox.className.includes('is-open')) {
   
    const mapEl = images.map(item => item.original);
    const indElImg = +mapEl.indexOf(lightBoxImg.src);
    
    if (e.code === 'ArrowLeft') {
      if (e.target.className === imgEl.className) {
        return;
      }
      const indLeftEl = indElImg - 1;
      lightBoxImg.src = mapEl[indLeftEl];
    
      if (indElImg === 0) {
      lightBoxImg.src = mapEl[+(mapEl.length) - 1];
      }
    }
    
    if (e.code === 'ArrowRight') {
      if (e.target.className === imgEl.className) {
        return;
      }
      const indRightEl = indElImg + 1;
      lightBoxImg.src = mapEl[indRightEl];
      if (indRightEl === mapEl.length) {
      lightBoxImg.src = mapEl[0];
      }
    }
  }
};

btn.addEventListener('click', onCloseLightbox);
overlayEl.addEventListener('click', onCloseModal);
document.addEventListener('keydown', onFlippingBtn);