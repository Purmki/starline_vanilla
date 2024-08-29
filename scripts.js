let currentPage = 1;
const defaultQuery = 'nature';
const randomQueries = [
    'sunset', 'mountains', 'ocean', 'forest', 'cityscape', 'wildlife', 
    'flowers', 'desert', 'galaxy', 'waterfall', 'tropical', 'autumn', 
    'winter', 'beach', 'rainforest', 'architecture', 'night sky', 
    'aurora', 'canyon', 'savanna', 'river', 'hiking', 'underwater', 
    'island', 'hot air balloons', 'camping', 'lakeside', 'meadow', 
    'volcano', 'glacier', 'urban', 'coral reef', 'starry night', 
    'frozen tundra', 'wild horses', 'butterflies', 'sunrise', 
    'jungle', 'cliffside', 'bamboo forest', 'lavender fields'
];

document.getElementById('fetchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value || defaultQuery;
    fetchImages(query);
});

function fetchImages(query) {
    fetch(`http://localhost:3005/api/images?q=${query}&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            const dataDiv = document.getElementById('data');
            console.log(data);

            dataDiv.innerHTML = '';

            if (data.hits && data.hits.length > 0) {
                data.hits.forEach(hit => {
                    const imgDiv = document.createElement('div');
                    imgDiv.style.backgroundImage = `url(${hit.webformatURL})`;
                    imgDiv.style.backgroundSize = 'cover';
                    imgDiv.style.backgroundPosition = 'center';
                    imgDiv.style.width = '200px';
                    imgDiv.style.height = '200px';
                    imgDiv.style.margin = '10px';
                    imgDiv.style.border = '1px solid #ddd';
                    imgDiv.style.borderRadius = '8px';
                    imgDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                    imgDiv.style.position = 'relative';
                    imgDiv.style.overflow = 'hidden';
                    imgDiv.style.cursor = 'pointer';
                    imgDiv.style.transition = 'transform 0.3s ease';

                    imgDiv.onmouseover = () => {
                        imgDiv.style.transform = 'scale(1.05)';
                    };
                    imgDiv.onmouseout = () => {
                        imgDiv.style.transform = 'scale(1)'; 
                    };

                    const heart = document.createElement('div');
                    heart.className = 'heart';
                    imgDiv.appendChild(heart);

                    const titleDiv = document.createElement('div');
                    titleDiv.textContent = hit.tags;
                    titleDiv.style.position = 'absolute';
                    titleDiv.style.bottom = '0';
                    titleDiv.style.left = '0';
                    titleDiv.style.background = 'rgba(0, 0, 0, 0.5)';
                    titleDiv.style.color = '#fff';
                    titleDiv.style.width = '100%';
                    titleDiv.style.textAlign = 'center';
                    titleDiv.style.padding = '5px';
                    titleDiv.style.boxSizing = 'border-box';

                    imgDiv.appendChild(titleDiv);
                    dataDiv.appendChild(imgDiv);

                    imgDiv.addEventListener('click', () => showModal(hit, imgDiv));

                    heart.addEventListener('click', function(e) {
                        e.stopPropagation(); // Prevent modal from opening when clicking the heart
                        heart.classList.toggle('is-active');

                        // Save to localStorage
                        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                        if (heart.classList.contains('is-active')) {
                            favorites.push(hit.webformatURL);
                        } else {
                            const index = favorites.indexOf(hit.webformatURL);
                            if (index > -1) {
                                favorites.splice(index, 1);
                            }
                        }
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                    });
                });

                const moreImagesButton = document.createElement('button');
                moreImagesButton.textContent = 'Load More Images';
                moreImagesButton.style.padding = '12px 24px';
                moreImagesButton.style.backgroundColor = '#28a745'; 
                moreImagesButton.style.color = '#fff'; 
                moreImagesButton.style.border = 'none';
                moreImagesButton.style.borderRadius = '8px';
                moreImagesButton.style.cursor = 'pointer';
                moreImagesButton.style.fontSize = '16px';
                moreImagesButton.style.fontWeight = 'bold';
                moreImagesButton.style.marginTop = '20px';
                moreImagesButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                moreImagesButton.style.transition = 'background-color 0.3s ease';
                
                moreImagesButton.addEventListener('click', () => {
                    currentPage++;
                    document.getElementById('fetchButton').click(); 
                });

                dataDiv.appendChild(moreImagesButton);
            } else {
                dataDiv.innerHTML = '<p>No images found.</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchImages(defaultQuery);
});

document.getElementById('luckyButton').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * randomQueries.length);
    const randomQuery = randomQueries[randomIndex];
    fetchImages(randomQuery);
});

function showModal(imageData, originalImageElement) {
    const modal = document.getElementById('myModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const imageEffect = document.getElementById('imageEffect');

    modalTitle.textContent = imageData.tags;
    modalImage.src = imageData.largeImageURL;
    modalDescription.textContent = `Views: ${imageData.views} | Downloads: ${imageData.downloads}`;

    modalImage.style.filter = 'none';
    imageEffect.value = 'none';
    modal.style.display = 'block';

    imageEffect.addEventListener('change', function() {
        modalImage.style.filter = imageEffect.value;
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            if (originalImageElement) {
                originalImageElement.style.filter = imageEffect.value;
            }
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach(heart => {
        heart.addEventListener('click', function() {
            heart.classList.toggle('is-active');
        });
    });
});
