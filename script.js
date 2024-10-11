const menuIconBtn = document.querySelector('.menu-icon');
const menuBtns = document.querySelectorAll('.menu-btn');
const popupMenuBtns = document.querySelectorAll('.popup-menu-btn');

const menuPopup = document.querySelector('.menu-popup');
const closeMenuIcon = document.querySelector('.menu-popup img');
const closeLightboxIcon = document.querySelector('.close-icon');
const overlay = document.querySelector('#overlay');
const imgThumbnails = document.querySelectorAll('.not-lightbox .img-thumbnail');
const lightboxImgThumbnails = document.querySelectorAll('.lightbox .img-thumbnail');
const lightbox = document.querySelector('.lightbox');
const backgroundImgs = document.querySelectorAll('.background-img');

const minusIconBtn = document.querySelector('.minus-icon')
const plusIconBtn = document.querySelector('.plus-icon')
const productQuantity = document.querySelector('.product-quantity')

const emptyOrNot = document.querySelector('.empty-or-not')
const emptyClasses = document.querySelectorAll('.empty')
const deleteIcon = document.querySelector('.delete-icon')

const addToCart = document.querySelector('.add-to-cart')
const price = document.querySelector('.price')
const fallEdition = document.querySelector('.fall-edition')

const cartIcon = document.querySelector('.cart')
const cartContainer = document.querySelector('.cart-container')
const notification = document.querySelector('.notification')

// New buttons for forward and backward
const forwardBtns = document.querySelectorAll('.forward-btn'); // Select forward buttons
const backwardBtns = document.querySelectorAll('.backward-btn'); // Select backward buttons

let currentImageIndex = 0; // Track the current image index

// Open and close menu functionality
menuIconBtn.addEventListener('click', (e) => {
    menuPopup.style.display = 'block';
    overlay.style.display = 'block';
    closeMenuIcon.addEventListener('click', (e) => {
        menuPopup.style.display = 'none';
        overlay.style.display = 'none';
    });
});

// Function to update background image
function updateBackgroundImage(src) {
    backgroundImgs.forEach((backgroundImg) => {
        backgroundImg.style.backgroundImage = `url(${src})`;
    });
}

// Function to remove outline from main thumbnails
function removeOutlineFromImgThumbnails() {
    imgThumbnails.forEach((selImgThumbnail) => {
        selImgThumbnail.classList.remove('outline');
    });
}

// Function to add and remove outline for lightbox thumbnails
function removeAndAddOutlineFromLightboxImgThumbnails(imgThumbnail) {
    lightboxImgThumbnails.forEach((lightboxImgThumbnail) => {
        lightboxImgThumbnail.classList.remove('outline');
        if (imgThumbnail.src === lightboxImgThumbnail.src) {
            lightboxImgThumbnail.classList.add('outline');
        }
    });
}

// Function to check the current thumbnail and update background image
function checkThumbnail(thumbnail) {
    const imgName = thumbnail.src.split('/').pop();
    for (let i = 1; i < 5; i++) {
        if (imgName === `image-product-${i}-thumbnail.jpg`) {
            updateBackgroundImage(`./images/image-product-${i}.jpg`);
            currentImageIndex = i - 1; // Update current image index
        }
    }
}

// Lightbox thumbnails event listener
lightboxImgThumbnails.forEach((lightboxImgThumbnail) => {
    lightboxImgThumbnail.addEventListener('click', () => {
        removeAndAddOutlineFromLightboxImgThumbnails(lightboxImgThumbnail);
        removeOutlineFromImgThumbnails();
        imgThumbnails.forEach((imgThumbnail) => {
            if (imgThumbnail.src === lightboxImgThumbnail.src) {
                imgThumbnail.classList.add('outline');
            }
        });
        checkThumbnail(lightboxImgThumbnail);
    });
});

// Main thumbnails event listener
imgThumbnails.forEach((imgThumbnail) => {
    imgThumbnail.addEventListener('click', (e) => {
        removeOutlineFromImgThumbnails();
        removeAndAddOutlineFromLightboxImgThumbnails(imgThumbnail);
        imgThumbnail.classList.add('outline');
        checkThumbnail(imgThumbnail);
        lightbox.style.display = 'block';
        overlay.style.display = 'block';
    });
});

// Close lightbox functionality
closeLightboxIcon.addEventListener('click', () => {
    lightbox.style.display = 'none';
    overlay.style.display = 'none';
});

// New: Update the image based on the current index
function updateImageByIndex(index) {
    const imgSrc = `./images/image-product-${index + 1}.jpg`;
    updateBackgroundImage(imgSrc);

    // Update outlines for both main and lightbox thumbnails
    removeOutlineFromImgThumbnails();
    removeAndAddOutlineFromLightboxImgThumbnails(imgThumbnails[index]);
    imgThumbnails[index].classList.add('outline');
    lightboxImgThumbnails[index].classList.add('outline');
}

// New: Forward button functionality
forwardBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % imgThumbnails.length; // Cycle forward
        updateImageByIndex(currentImageIndex);
    });
});

// New: Backward button functionality
backwardBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + imgThumbnails.length) % imgThumbnails.length; // Cycle backward
        updateImageByIndex(currentImageIndex);
    });
});

minusIconBtn.addEventListener('click', () =>{
    if (parseInt(productQuantity.innerText) !== 0 ) {
        productQuantity.innerText = parseInt(productQuantity.innerText) - 1
    }
})
plusIconBtn.addEventListener('click', () =>{
    productQuantity.innerText = parseInt(productQuantity.innerText) + 1
    
})

// Toggle cart container when cart icon is clicked
cartIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from propagating to the document
    if (cartContainer.style.display === 'block') {
        cartContainer.style.display = 'none';
    } else {
        cartContainer.style.display = 'block';
    }
});

// Close cart when clicking outside of cart container
document.addEventListener('click', (e) => {
    if (!cartContainer.contains(e.target) && !cartIcon.contains(e.target)) {
        cartContainer.style.display = 'none'; // Hide the cart container
    }
});

const emptyText = document.createElement('div')
const totalAmount = document.createElement('div')

function emptyContent() {
    emptyClasses.forEach((emptyClass) => {
        if (emptyClass.classList.contains('empty')) {
            emptyText.innerText = 'Your cart is empty'
            emptyText.classList.add('empty-text')
            emptyOrNot.append(emptyText)        
        } else{
            emptyText.remove()
        }    
    })
}

emptyContent() 

addToCart.addEventListener('click', (e) => {
    const productQuantityNum = parseInt(productQuantity.innerText)
    const priceValue = parseFloat(price.innerText.split('$').pop()) 
    if (productQuantityNum) {
        console.log(productQuantityNum  );
        emptyClasses.forEach((emptyClass) => {
            emptyClass.classList.remove('empty')
        })
        emptyContent()
        totalAmount.innerHTML = `$${priceValue.toFixed(2)} &times ${productQuantityNum}
        <span>$${(priceValue * productQuantityNum).toFixed(2)}</span>`
        totalAmount.classList.add('total-amount')
        fallEdition.append(totalAmount)
        notification.innerText = productQuantityNum 
        notification.style.display = 'block'
    }
})
deleteIcon.addEventListener('click', () =>{
    emptyClasses.forEach((emptyClass) => {
        emptyClass.classList.add('empty')
    })
    
    emptyContent()  
    notification.style.display = 'none'
})

menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener('click', () => {
        menuBtns.forEach((menuBtn) => {
            menuBtn.classList.remove('underline')
        })
        menuBtn.classList.add('underline')
    })
})
popupMenuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener('click', () => {
        popupMenuBtns.forEach((menuBtn) => {
            menuBtn.classList.remove('orange-color')
        })
        menuBtn.classList.add('orange-color')
    })
})