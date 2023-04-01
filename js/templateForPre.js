class ButtonGroup extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById('button-template');
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(template.content.cloneNode(true));
      shadowRoot.querySelector('.share-btn').addEventListener('click', () => {
        console.log('Share button clicked');
      });
      shadowRoot.querySelector('.favorite-btn').addEventListener('click', () => {
        console.log('Favorite button clicked');
      });
    }
  }
  
customElements.define('button-group', ButtonGroup);

const catTemplate = document.getElementById('item-template');
const catContainer = document.getElementById('container');
const apiKey = 'live_g2TlRXkZBAczbt1TkDyGIjgWk2Yd1wHzR7NahHoqdHGLa0bVho0uKmSl8u9otL1v';

fetch(`https://api.thecatapi.com/v1/images/search?limit=10`, {
  headers: {
    'x-api-key': apiKey
  }
})
  .then(response => response.json())
  .then(data => {
    data.forEach(cat => {
      const catInstance = catTemplate.content.cloneNode(true);
      catInstance.querySelector('img').src = cat.url;
      catInstance.querySelector('h2').textContent = cat.id;
      catInstance.querySelector('p').textContent = `Width: ${cat.width} Height: ${cat.height}`;
      catContainer.appendChild(catInstance);
    });
  })
  .catch(error => {
    console.error('Error fetching cat images:', error);
  });
