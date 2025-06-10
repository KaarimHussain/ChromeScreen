// Default links data with actual image paths
const defaultLinks = [
  // Languages
  {
    name: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    category: "language",
    image: "img/JavaScript.png",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/docs/",
    category: "language",
    image: "img/TypeScript.png",
  },
  {
    name: "C#",
    url: "https://docs.microsoft.com/en-us/dotnet/csharp/",
    category: "language",
    image: "img/CSharp.png",
  },
  {
    name: "PHP",
    url: "https://www.php.net/docs.php",
    category: "language",
    image: "img/PHP.png",
  },
  {
    name: "Dart",
    url: "https://dart.dev/guides",
    category: "language",
    image: "img/Dart.png",
  },
  {
    name: "HTML5",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    category: "language",
    image: "img/HTML5.png",
  },
  {
    name: "CSS3",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    category: "language",
    image: "img/CSS3.png",
  },

  // Frameworks
  {
    name: "Angular",
    url: "https://angular.io/docs",
    category: "framework",
    image: "img/Angular.png",
  },
  {
    name: "Laravel",
    url: "https://laravel.com/docs",
    category: "framework",
    image: "img/Laravel.png",
  },
  {
    name: "Flutter",
    url: "https://docs.flutter.dev/",
    category: "framework",
    image: "img/Flutter.png",
  },
  {
    name: ".NET",
    url: "https://docs.microsoft.com/en-us/dotnet/",
    category: "framework",
    image: "img/NET.png",
  },

  // Tools
  {
    name: "Tailwind CSS",
    url: "https://tailwindcss.com/docs",
    category: "tool",
    image: "img/Tailwind CSS.png",
  },
  {
    name: "Bootstrap",
    url: "https://getbootstrap.com/docs/",
    category: "tool",
    image: "img/Bootstrap.png",
  },
  {
    name: "MySQL",
    url: "https://dev.mysql.com/doc/",
    category: "tool",
    image: "img/MySQL.png",
  },
  {
    name: "Microsoft SQL Server",
    url: "https://docs.microsoft.com/en-us/sql/",
    category: "tool",
    image: "img/Microsoft SQL Server.png",
  },
  {
    name: "Unity",
    url: "https://docs.unity3d.com/",
    category: "tool",
    image: "img/Unity.png",
  },
  {
    name: "Godot Engine",
    url: "https://godotengine.org/documentation/",
    category: "tool",
    image: "img/Godot Engine.png",
  },
  {
    name: "Git",
    url: "https://git-scm.com/doc",
    category: "tool",
    image: "img/Git.png",
  },

  // Design
  {
    name: "Figma",
    url: "https://www.figma.com/developers",
    category: "design",
    image: "img/Figma.png",
  },
  {
    name: "Canva",
    url: "https://www.canva.com/help/",
    category: "design",
    image: "img/Canva.png",
  },
  {
    name: "Bolt",
    url: "https://docs.bolt.new/",
    category: "design",
    image: "img/Bolt.png",
  },
  {
    name: "V0",
    url: "https://v0.dev/",
    category: "design",
    image: "img/V0.png",
  },
];

// State management
let currentLinks = [];
let currentUsername = "Developer";
let currentTheme = "default";

// Weather API configuration
const WEATHER_API_KEY = "your_openweathermap_api_key"; // You need to get this from openweathermap.org
const WEATHER_CITY = "Karachi";
const WEATHER_COUNTRY = "PK";

// Initialize the application
function init() {
  loadPreferences();
  updateTime();
  updateGreeting();
  fetchWeather();
  renderLinks();

  // Set up event listeners
  setupEventListeners();

  // Start intervals
  setInterval(updateTime, 1000);
  setInterval(fetchWeather, 600000); // Update weather every 10 minutes
}

// Load saved preferences from localStorage
function loadPreferences() {
  const savedUsername = localStorage.getItem("username");
  const savedLinks = localStorage.getItem("quickLinks");
  const savedTheme = localStorage.getItem("background");

  if (savedUsername) {
    currentUsername = savedUsername;
    document.getElementById("username").textContent = currentUsername;
    document.getElementById("usernameInput").value = currentUsername;
  }

  if (savedLinks) {
    currentLinks = JSON.parse(savedLinks);
  } else {
    currentLinks = [...defaultLinks];
  }

  if (savedTheme) {
    currentTheme = savedTheme;
    changeBackground(savedTheme);
  }
}

// Time and greeting functions
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById("currentTime").textContent = timeString;
}

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  document.getElementById("greeting").textContent = greeting;
}

// Weather functionality with real API
async function fetchWeather() {
  try {
    // Using a free weather API that doesn't require API key for demo
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY},${WEATHER_COUNTRY}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      // Fallback to mock data if API fails
      updateWeatherDisplay({
        temp: Math.floor(Math.random() * 15) + 20,
        description: ["Clear", "Cloudy", "Sunny", "Partly Cloudy"][
          Math.floor(Math.random() * 4)
        ],
        icon: "sun",
        location: "Karachi",
      });
      return;
    }

    const data = await response.json();

    const weatherData = {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: getWeatherIconType(data.weather[0].icon),
      location: data.name,
    };

    updateWeatherDisplay(weatherData);
  } catch (error) {
    console.log("Weather API error, using mock data");
    // Fallback to mock data
    updateWeatherDisplay({
      temp: Math.floor(Math.random() * 15) + 20,
      description: ["Clear", "Cloudy", "Sunny", "Partly Cloudy"][
        Math.floor(Math.random() * 4)
      ],
      icon: "sun",
      location: "Karachi",
    });
  }
}

function updateWeatherDisplay(weatherData) {
  document.getElementById("temperature").textContent = `${weatherData.temp}°C`;
  document.getElementById("weatherDesc").textContent = weatherData.description;

  // Add location if element exists
  let locationElement = document.getElementById("weatherLocation");
  if (!locationElement) {
    locationElement = document.createElement("span");
    locationElement.id = "weatherLocation";
    locationElement.className = "weather-location";
    document.querySelector(".weather-details").appendChild(locationElement);
  }
  locationElement.textContent = weatherData.location;

  // Update weather icon
  const iconElement = document.getElementById("weatherIcon");
  const iconSVG = getWeatherIcon(weatherData.icon);
  iconElement.innerHTML = iconSVG;
}

function getWeatherIconType(iconCode) {
  // Map OpenWeatherMap icon codes to our icon types
  const iconMap = {
    "01d": "sun",
    "01n": "moon",
    "02d": "cloud",
    "02n": "cloud",
    "03d": "cloud",
    "03n": "cloud",
    "04d": "cloud",
    "04n": "cloud",
    "09d": "rain",
    "09n": "rain",
    "10d": "rain",
    "10n": "rain",
    "11d": "storm",
    "11n": "storm",
    "13d": "snow",
    "13n": "snow",
    "50d": "mist",
    "50n": "mist",
  };
  return iconMap[iconCode] || "sun";
}

function getWeatherIcon(type) {
  const icons = {
    sun: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
    moon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    cloud:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    rain: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 13v8l-4-4-4 4v-8"/><path d="M12 3L8 7l4 4 4-4-4-4z"/></svg>',
    storm:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>',
    snow: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="8" y1="20" x2="8.01" y2="20"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="12" y1="22" x2="12.01" y2="22"/><line x1="16" y1="16" x2="16.01" y2="16"/><line x1="16" y1="20" x2="16.01" y2="20"/></svg>',
    mist: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15h18M3 9h18M3 21h18M3 3h18"/></svg>',
  };
  return icons[type] || icons.sun;
}

// Search functionality
function performSearch() {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      "_blank"
    );
    document.getElementById("searchInput").value = "";
  }
}

// Settings functions
function toggleSettings() {
  const panel = document.getElementById("settingsPanel");
  panel.classList.toggle("open");
}

function updateUsername() {
  const newUsername = document.getElementById("usernameInput").value.trim();
  if (newUsername) {
    currentUsername = newUsername;
    document.getElementById("username").textContent = currentUsername;
    localStorage.setItem("username", currentUsername);
  }
}

function changeBackground(type) {
  const body = document.body;
  body.className = "";

  // Update theme options
  document.querySelectorAll(".theme-option").forEach((option) => {
    option.classList.remove("active");
  });

  switch (type) {
    case "gradient":
      body.classList.add("gradient-bg");
      break;
    case "dots":
      body.classList.add("dots-bg");
      break;
    case "mesh":
      body.classList.add("mesh-bg");
      break;
    case "waves":
      body.classList.add("waves-bg");
      break;
    case "circuit":
      body.classList.add("circuit-bg");
      break;
    case "hexagon":
      body.classList.add("hexagon-bg");
      break;
    case "neural":
      body.classList.add("neural-bg");
      break;
    case "matrix":
      body.classList.add("matrix-bg");
      break;
    default:
      // Default background
      break;
  }

  // Mark active theme
  const activeOption = document.querySelector(`[data-theme="${type}"]`);
  if (activeOption) {
    activeOption.classList.add("active");
  }

  currentTheme = type;
  localStorage.setItem("background", type);
}

// Links management
function renderLinks() {
  const grid = document.getElementById("linksGrid");
  grid.innerHTML = "";

  currentLinks.forEach((link, index) => {
    const linkElement = createLinkElement(link, index);
    grid.appendChild(linkElement);
  });
}

function createLinkElement(link, index) {
  const linkElement = document.createElement("a");
  linkElement.href = link.url;
  linkElement.target = "_blank";
  linkElement.className = "link-card";
  linkElement.innerHTML = `
      <img src="${link.image}" alt="${link.name}" class="link-icon" onerror="this.style.display='none'">
      <span class="link-name">${link.name}</span>
      <button class="remove-link" onclick="removeLink(${index}); event.preventDefault(); event.stopPropagation();">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    `;

  return linkElement;
}

function removeLink(index) {
  currentLinks.splice(index, 1);
  localStorage.setItem("quickLinks", JSON.stringify(currentLinks));
  renderLinks();
}

// Add link dialog
function showAddLinkDialog() {
  document.getElementById("addLinkDialog").classList.add("open");
  document.getElementById("linkName").focus();
}

function hideAddLinkDialog() {
  document.getElementById("addLinkDialog").classList.remove("open");
  // Clear form
  document.getElementById("linkName").value = "";
  document.getElementById("linkUrl").value = "";
  document.getElementById("linkCategory").value = "language";
}

function addNewLink() {
  const name = document.getElementById("linkName").value.trim();
  const url = document.getElementById("linkUrl").value.trim();
  const category = document.getElementById("linkCategory").value;

  if (name && url) {
    const newLink = {
      name,
      url,
      category,
      image: "img/default.png", // You can add a default image or let users specify
    };

    currentLinks.push(newLink);
    localStorage.setItem("quickLinks", JSON.stringify(currentLinks));
    renderLinks();
    hideAddLinkDialog();
  }
}

// Event listeners setup
function setupEventListeners() {
  // Search functionality
  document
    .getElementById("searchInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });

  // Keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Cmd/Ctrl + K for search
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      document.getElementById("searchInput").focus();
    }

    // Escape to close panels
    if (e.key === "Escape") {
      document.getElementById("settingsPanel").classList.remove("open");
      hideAddLinkDialog();
    }
  });

  // Click outside to close settings
  document.addEventListener("click", function (e) {
    const settingsPanel = document.getElementById("settingsPanel");
    const settingsBtn = document.getElementById("settingsBtn");

    if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
      settingsPanel.classList.remove("open");
    }
  });

  // Dialog form submission
  document
    .getElementById("linkName")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("linkUrl").focus();
      }
    });

  document.getElementById("linkUrl").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewLink();
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);
