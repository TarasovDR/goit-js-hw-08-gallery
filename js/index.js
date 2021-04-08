import galleryItems from '../gallery-items.js';

// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
};

const gallery = document.querySelector('.js-gallery');
const galleryMarkup = makeGalleryList(galleryItems);

function makeGalleryList(imagesGallery) {
  return imagesGallery
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a href=${original} class="gallery__link">
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

refs.gallery.insertAdjacentHTML('afterbegin', galleryMarkup);
