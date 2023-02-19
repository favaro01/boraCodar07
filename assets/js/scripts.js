// Mock de dados dos cards
const cards = [
    {
        title: 'O Python do vovô não sobe mais',
        city: 'São Paulo - SP',
        imageUrl: 'https://via.placeholder.com/300x200',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
        title: 'Todo mundo null',
        city: 'Florianópolis - SC',
        imageUrl: 'https://via.placeholder.com/300x200',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
        title: 'Hoje dou exception',
        city: 'Curitiba - PR',
        imageUrl: 'https://via.placeholder.com/300x200',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
        title: 'Manda Node',
        city: 'Salvador - BA',
        imageUrl: 'https://via.placeholder.com/300x200',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
        title: 'Só no back-end',
        city: 'São Paulo - SP',
        imageUrl: 'https://via.placeholder.com/300x200',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
    },
    {
        title: 'Esse anel não é de Ruby',
        city: 'São Paulo - SP',
        imageUrl: 'https://via.placeholder.com/300x200',
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
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
const PAGE_SIZE = 9;
let currentPage = 1;
  
// Função que renderiza os cards na tela
function renderCards(cardsToRender) {
    // Limpa o container de cards
    cardsContainer.innerHTML = '';
  
    // Renderiza os cards
    for (let i = 0; i < cardsToRender.length; i++) {
      const card = cardsToRender[i];
      const cardHtml = `
        <div class="card">
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
  
// Chama a função de renderização pela primeira vez
render();
  
// Adiciona event listener nos inputs para refazer a paginação quando houver alteração nos filtros
searchInput.addEventListener('input', render);
citySelect.addEventListener('change', render);
    