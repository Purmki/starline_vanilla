let currentPage = 1;

document.getElementById('fetchButton').addEventListener('click', function() {
    const apiKey = '37322268-d0f2e08df57657fb37f0dd73d';
    const query = document.getElementById('searchInput').value;
    fetch(`https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&page=${currentPage}`)
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

                    // Add click event to show modal
                    imgDiv.addEventListener('click', () => showModal(hit));
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
});

function showModal(imageData) {
    const modal = document.getElementById('myModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');

    modalTitle.textContent = imageData.tags;
    modalImage.src = imageData.largeImageURL;
    modalDescription.textContent = `Views: ${imageData.views} | Downloads: ${imageData.downloads}`;

    modal.style.display = 'block';
}

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
