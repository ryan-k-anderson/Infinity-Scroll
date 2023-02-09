const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Usnplash API
let count = 5;
const apiKey = 'nsBUGnGww_22295KuSEShKP9aM_ZYo7PTaccXVUd2uc'
let apiURL= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden=true;
        count = 30;
        apiURL= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    };
};



//Helper Function to St Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}



//Create Elements for Links and Photos, Add to DOM
function createPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in Photos Array
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        //Crate <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded())
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}




// Get photos fro UnsplashAPI
async function getPhotos() {
    try{
        const response = await fetch(apiURL);
        photosArray =  await response.json();
        createPhotos();
    } catch(error) {
        // Catch error here
    }
}



//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight = window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
    }
})



//OnLoad
getPhotos();

//Unsplash API only allows 50 GET requests in an hour time period