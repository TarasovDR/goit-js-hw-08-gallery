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

function makeGalleryList(imagesGallery) {
  return imagesGallery
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a 
        class="gallery__link"
        href=${original}>
          <img 
          src=${preview}
          data-source=${original}
          class="gallery__image"
          alt=${description}
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
  if (e.target.classList.contains('lightbox__image')) {
    return;
  }
  addLightboxClass(e);
  setOriginalImage(e);
  console.log(e.target.dataset.source);
}

function addLightboxClass() {
  refs.lightbox.classList.add('is-open');
}

// --- Close ---
function onModalClose(e) {
  e.preventDefault();
  if (!e.target.classList.contains('lightbox__button')) {
    return;
  }
  removeLightboxClass(e);
  refs.lightboxImage.src = '';
  // console.log(e.target);
}

function removeLightboxClass() {
  refs.lightbox.classList.remove('is-open');
}

function setOriginalImage(e) {
  const originalImage = e.target.dataset.source;
  refs.lightboxImage.src = originalImage;
}

// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
