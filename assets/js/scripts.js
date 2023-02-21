// Mock de dados dos cards
const cards = [
    {
        title: 'O Python do vovô não sobe mais',
        city: 'São Paulo - SP',
        imageUrl: 'assets/img/unsplash_b2jkMC95a_8.png',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        lat: '-23.486349',
        lng: '-46.608636',
    },
    {
        title: 'Todo mundo null',
        city: 'Florianópolis - SC',
        imageUrl: 'assets/img/c2.png',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        lat: '-27.449002',
        lng: '-48.527953',        
    },
    {
        title: 'Hoje dou exception',
        city: 'Curitiba - PR',
        imageUrl: 'assets/img/c3.png',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        lat: '-25.440193',
        lng: '-49.273341',
    },
    {
        title: 'Manda Node',
        city: 'Salvador - BA',
        imageUrl: 'assets/img/c4.png',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        lat: '-12.959993',
        lng: '-38.484666',
    },
    {
        title: 'Só no back-end',
        city: 'São Paulo - SP',
        imageUrl: 'assets/img/c5.png',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        lat: '-23.556600',
        lng: '-46.633021',
    },
    {
        title: 'Esse anel não é de Ruby',
        city: 'São Paulo - SP',
        imageUrl: 'assets/img/c6.png',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        lat: '-23.528424',
        lng: '-46.710394',
    },
    {
        title: 'Pimenta no C# dos outros é refresco',
        city: 'Rio de Janeiro - RJ',
        imageUrl: 'assets/img/c7.png',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        lat: '-22.901704',
        lng: '-43.354887',
    },
    {
        title: 'EnCACHE aqui',
        city: 'Porto Alegre - RS',
        imageUrl: 'assets/img/c8.png',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        lat: '-30.059318',
        lng: '-51.193167',
    },
    {
        title: 'Não valho nada mas JAVA li',
        city: 'São Paulo - SP',
        imageUrl: 'assets/img/c9.png',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
        lat: '-23.588789',
        lng: '-46.634510',
    },
];
  
// Elementos do DOM
const searchInput = document.querySelector('#searchInput');
const citySelect = document.querySelector('#citySelect');
const cardsContainer = document.querySelector('#cardsContainer');
const paginationContainer = document.querySelector('#paginationContainer');

// Preenche as opções do select com as cidades únicas dos cards
const cities = getCities();
for (let i = 0; i < cities.length; i++) {
  const city = cities[i];
  const option = document.createElement('option');
  option.value = city;
  option.textContent = city;
  citySelect.appendChild(option);
}
  
// Constantes da paginação
const PAGE_SIZE = 6;
let currentPage = 1;
  
// Função que renderiza os cards na tela
function renderCards(cardsToRender) {
    // Limpa o container de cards
    cardsContainer.innerHTML = '';
  
    // Renderiza os cards
    for (let i = 0; i < cardsToRender.length; i++) {
      const card = cardsToRender[i];
      const cardHtml = `
        <div class="card p-0">
          <img src="${card.imageUrl}" class="card-img-top" alt="Imagem do card">
          <div class="card-body">
            <h5 class="card-title">${card.title}</h5>
            <p class="card-text">${card.description}</p>
            <p class="card-text"><small class="text-muted">${card.city}</small></p>
          </div>
        </div>
      `;
  
      cardsContainer.insertAdjacentHTML('beforeend', cardHtml);
    }
}
  
// Função que renderiza os links da paginação na tela
function renderPaginationLinks(totalPages) {
    // Limpa o container de links
    paginationContainer.innerHTML = '';

    // Renderiza os links
    for (let i = 1; i <= totalPages; i++) {
        const linkHtml = `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#">${i}</a>
        </li>
        `;

        paginationContainer.insertAdjacentHTML('beforeend', linkHtml);
    }

    // Adiciona event listener nos links para trocar de página
    const pageLinks = paginationContainer.querySelectorAll('.page-link');
    for (let i = 0; i < pageLinks.length; i++) {
        const link = pageLinks[i];

        link.addEventListener('click', (event) => {
            event.preventDefault();

            const newPage = parseInt(link.textContent);
            if (newPage !== currentPage) {
                currentPage = newPage;
                render();
            }
        });
    }
}
  
// Função que retorna os cards filtrados por pesquisa e cidade
function getFilteredCards() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCity = citySelect.value;

    return cards.filter(card => {
        const matchesSearchTerm = card.title.toLowerCase().includes(searchTerm) || card.description.toLowerCase().includes(searchTerm);
        const matchesSelectedCity = !selectedCity || card.city === selectedCity;

        return matchesSearchTerm && matchesSelectedCity;
    });
}
  
  // Função que renderiza a lista de cards com a paginação e os filtros
function render() {
    // Obtém os cards filtrados
    const filteredCards = getFilteredCards();
  
    // Calcula o número total de páginas
    const totalPages = Math.ceil(filteredCards.length / PAGE_SIZE);
  
    // Renderiza os cards da página atual
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, filteredCards.length);
    const cardsToRender = filteredCards.slice(startIndex, endIndex);
    renderCards(cardsToRender);
  
    // Renderiza os links da paginação
    renderPaginationLinks(totalPages);
}

// Função que retorna um array com as cidades únicas dos cards
function getCities() {
    const cities = [];
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (!cities.includes(card.city)) {
        cities.push(card.city);
      }
    }
    return cities;
}

function renderMap() {
  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([cards[0].lng, cards[0].lat]),
      zoom: 10
    })
  });

  const markerLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: []
    })
  });

  map.addLayer(markerLayer);

  const textStyle = new ol.style.Style({
    text: new ol.style.Text({
      text: '',
      font: '12px Calibri,sans-serif',
      fill: new ol.style.Fill({ color: '#000' }),
      backgroundFill: new ol.style.Fill({ color: '#fff' }),
      padding: [3, 3, 3, 3],
      offsetY: -25,
      textAlign: 'center',
      overflow: true
    })
  });

  cards.forEach((card) => {
    const marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([card.lng, card.lat])
      )
    });

    marker.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      }),
      text: new ol.style.Text({
        text: card.title,
        offsetY: -20,
        font: 'bold 12px Calibri,sans-serif',
        fill: new ol.style.Fill({ color: '#000' }),
        backgroundFill: new ol.style.Fill({ color: '#fff' }),
        padding: [3, 3, 3, 3],
        textAlign: 'center',
        overflow: true
      })
    }));

    marker.set('card', card);
    markerLayer.getSource().addFeature(marker);
  });

  const popup = new ol.Overlay.Popup({
    popupClass: 'default', // Use default popup style
    positioning: 'bottom-center',
    autoPan: true,
    autoPanAnimation: { duration: 250 },
  });

  map.addOverlay(popup);

  map.on('click', (event) => {
    const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);

    if (feature) {
      const card = feature.get('card');
      const content = `
        <div>
          <h2>${card.title}</h2>
          <p>${card.description}</p>
        </div>
      `;

      popup.show(event.coordinate, content);
    } else {
      popup.hide();
    }
  });
}

// Chama a função de renderização pela primeira vez
render();

// Chama a função de renderização do mapa
renderMap();
  
// Adiciona event listener nos inputs para refazer a paginação quando houver alteração nos filtros
searchInput.addEventListener('input', render);
citySelect.addEventListener('change', render);
    