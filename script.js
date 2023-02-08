const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let photosArray = [];


// Usnplash API
const count = 10;
const apiKey = 'nsBUGnGww_22295KuSEShKP9aM_ZYo7PTaccXVUd2uc'
const apiURL= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper Function to St Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements for Links and Photos, Add to DOM
function createPhotos() {
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
        })
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
        console.log("Load More Photos")
    }
})

//OnLoad
getPhotos();