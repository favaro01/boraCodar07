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

// Cria um mapa com os pins dos locais
function renderMap() {
    // Seleciona o elemento div do mapa
    const mapContainer = document.querySelector('#map');
  
    // Define a localização inicial e o zoom do mapa
    const initialLocation = [cards[0].lat, cards[0].lng];
    const zoomLevel = 10;
  
    // Cria o mapa
    const map = L.map(mapContainer).setView(initialLocation, zoomLevel);
  
    // Adiciona o tile layer do mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(map);
  
    // Adiciona os pins para cada local do array de cards de forma assíncrona
    let i = 0;
    const addMarker = () => {
      if (i < cards.length) {
        const card = cards[i];
        const marker = L.marker([card.lat, card.lng]).addTo(map);
        marker.bindPopup(`<b>${card.title}</b><br>${card.description}`).openPopup();
        i++;
        setTimeout(addMarker, 10); // espera 10ms antes de adicionar o próximo marcador
      }
    };
    addMarker();
    
    // Adiciona o clustering de marcadores
    const markers = L.markerClusterGroup();
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const marker = L.marker([card.lat, card.lng]);
      marker.bindPopup(`<b>${card.title}</b><br>${card.description}`);
      markers.addLayer(marker);
    }
    map.addLayer(markers);
}
  
// Chama a função de renderização pela primeira vez
render();

// Chama a função de renderização do mapa
renderMap();
  
// Adiciona event listener nos inputs para refazer a paginação quando houver alteração nos filtros
searchInput.addEventListener('input', render);
citySelect.addEventListener('change', render);
    