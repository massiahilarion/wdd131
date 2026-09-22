const temples = [
  {
    templeName: 'Aba Nigeria',
    location: 'Aba, Nigeria',
    dedicated: '2005, August, 7',
    area: 11500,
    imageUrl: 'images/aba-nigeria.jpg'
  },
  {
    templeName: 'Manti Utah',
    location: 'Manti, Utah, United States',
    dedicated: '1888, May, 21',
    area: 74792,
    imageUrl: 'images/manti-utah.jpg'
  },
  {
    templeName: 'Payson Utah',
    location: 'Payson, Utah, United States',
    dedicated: '2015, June, 7',
    area: 96630,
    imageUrl: 'images/payson-utah.jpg'
  },
  {
    templeName: 'Yigo Guam',
    location: 'Yigo, Guam',
    dedicated: '2020, May, 2',
    area: 6861,
    imageUrl: 'images/yigo-guam.jpg'
  },
  {
    templeName: 'Washington D.C.',
    location: 'Kensington, Maryland, United States',
    dedicated: '1974, November, 19',
    area: 156558,
    imageUrl: 'images/washington-d.c.jpg'
  },
  {
    templeName: 'Lima Perú',
    location: 'Lima, Perú',
    dedicated: '1986, January, 10',
    area: 9600,
    imageUrl: 'images/lima-peru.jpg'
  },
  {
    templeName: 'Mexico City Mexico',
    location: 'Mexico City, Mexico',
    dedicated: '1983, December, 2',
    area: 116642,
    imageUrl: 'images/mexico-city-mexico.jpg'
  },
  {
    templeName: 'Freiberg Germany',
    location: 'Freiberg, Germany',
    dedicated: '1985, June, 29',
    area: 14424,
    imageUrl: 'images/freiberg-germany.jpg'
  },
  {
    templeName: 'Rome Italy',
    location: 'Rome, Italy',
    dedicated: '2019, March, 10',
    area: 41010,
    imageUrl: 'images/rome-italy.jpg'
  },
  {
    templeName: 'Bountiful Utah',
    location: 'Bountiful, Utah, United States',
    dedicated: '1995, January, 8',
    area: 104000,
    imageUrl: 'images/bountiful-utah.jpg'
  }
];

function dedicationYear(temple) {
  return parseInt(temple.dedicated.split(',')[0], 10);
}

function buildCard(temple) {
  const card = document.createElement('figure');
  card.className = 'temple-card';

  const heading = document.createElement('h2');
  heading.textContent = temple.templeName;

  const info = document.createElement('div');
  info.className = 'temple-info';
  info.innerHTML = `
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
  `;

  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.loading = 'lazy';
  img.width = 500;
  img.height = 333;

  card.appendChild(heading);
  card.appendChild(img);
  card.appendChild(info);

  return card;
}

function renderTemples(templeList) {
  const container = document.getElementById('temple-cards');
  container.innerHTML = '';
  templeList.forEach(temple => container.appendChild(buildCard(temple)));
}

function filterTemples(filter) {
  switch (filter) {
    case 'old':
      return temples.filter(t => dedicationYear(t) < 1900);
    case 'new':
      return temples.filter(t => dedicationYear(t) > 2000);
    case 'large':
      return temples.filter(t => t.area > 90000);
    case 'small':
      return temples.filter(t => t.area < 10000);
    case 'home':
    default:
      return temples;
  }
}

const headingText = {
  home: 'Home',
  old: 'Old Temples',
  new: 'New Temples',
  large: 'Large Temples',
  small: 'Small Temples'
};

function applyFilter(filter) {
  renderTemples(filterTemples(filter));
  document.getElementById('page-heading').textContent = headingText[filter] || 'Home';

  document.querySelectorAll('#primary-nav a').forEach(link => {
    link.classList.toggle('active', link.dataset.filter === filter);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const modifiedSpan = document.getElementById('last-modified');
  if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
  }

  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen
        ? '<span class="menu-icon">✕</span>'
        : '<span class="menu-icon">☰</span>';
    });
  }

  document.querySelectorAll('#primary-nav a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      applyFilter(link.dataset.filter);

      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<span class="menu-icon">☰</span>';
      }
    });
  });

  applyFilter('home');
});