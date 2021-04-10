import galleryItems from '../gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxCloseBtn: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

const galleryMarkup = makeGalleryList(galleryItems);
refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);
refs.gallery.addEventListener('click', onModalOpen);
refs.lightbox.addEventListener('click', onModalClose);
refs.lightboxOverlay.addEventListener('click', onModalClose);

function makeGalleryList(imagesGallery) {
  return imagesGallery
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a 
          class="gallery__link"
          href=${original}
        >
            <img 
              src=${preview}
              data-source=${original}
              class="gallery__image"
              alt=${description}
              loading="lazy"
            />
        </a>
      </li>    
      `;
    })
    .join('');
}

// --- Open ---
function onModalOpen(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  addLightboxClass(e);
  setOriginalImage(e);

  window.addEventListener('keydown', onModalClose);
  console.log(e.target.dataset.source);
}

function addLightboxClass() {
  refs.lightbox.classList.add('is-open');
}

function setOriginalImage(e) {
  const originalImage = e.target.dataset.source;
  refs.lightboxImage.src = originalImage;
}

// --- Close ---
function onModalClose(e) {
  const isCloseBtn = e.target.classList.contains('lightbox__button');
  const isCloseOverlay = e.target.classList.contains('lightbox__overlay');
  const isCloseEscBtn = e.code === 'Escape';

  if (isCloseBtn || isCloseOverlay || isCloseEscBtn) {
    removeLightboxClass(e);
    refs.lightboxImage.src = '';
  }

  window.removeEventListener('keydown', onModalClose);
}

function removeLightboxClass() {
  refs.lightbox.classList.remove('is-open');
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
