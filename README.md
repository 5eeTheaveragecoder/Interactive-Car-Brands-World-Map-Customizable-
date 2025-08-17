# 🌍 Interactive Car Brands World Map
## By:- 5eeTheaveragecoder

## 🚗 Project Overview
This project displays an interactive world map where the origin countries of 40 famous car brands are marked using the brand logo. You can move around the detailed map freely, and zoom in and out at convenience. Each marker, after clicking it shows a popup with brand details including:
- Car brand logo
- Country of origin
- Short history and description
- Brand website link

The map also includes a search bar on top right corner to quickly locate any brand and zoom in on its location whilist showing the popup.

The map is optimized for larger screens and a warning message is shown on small screens.

---

## 🔌 Adaptability
The structure of this project is intentionally simple, making it highly adaptable for other purposes.  
The core logic is contained within a single JavaScript file where the data is stored in a straightforward array.

You can easily repurpose this map to visualize any set of geographical data, such as:

- 🏛️ Historical landmarks  
- 🍔 Restaurant or store chains  
- 🏢 Company office locations  
- 🗺️ Tourist attractions  

To adapt the project, you only need to modify the `brands` array in **carinfo.js** with your own data points.

---

## 🔧 Customization
You can easily add new car brands or modify existing ones.

1. Open the **carinfo.js** file.  
2. Find the `brands` array.  
3. To add a new brand, append a new object to the array with the following structure:

```js
{
  name: "Brand Name",
  country: "Country of Origin",
  coords: [latitude, longitude],
  info: "A brief history or description of the brand.",
  logo: "URL to the brand's logo image.",
  link: "URL to the brand's official website."
}
```
Example:
```js
{
  name: "Koenigsegg",
  country: "Sweden",
  coords: [56.213, 12.85],
  info: "Founded in 1994 by Christian von Koenigsegg, this Swedish manufacturer is known for producing some of the fastest and most exclusive hypercars in the world.",
  logo: "https://upload.wikimedia.org/wikipedia/en/3/37/Koenigsegg_logo.svg",
  link: "https://www.koenigsegg.com/"
}
```

---

## 📂 How to Open/View the Project
1. Download the project .zip folder, extract it and open it.
2. Open the `main.html` file in any modern web browser.
3. Make sure you're connected to the **internet** and the speeds are decent (needed for loading online map tiles and brand logos).

---

## 🛠️ Tools & Technologies Used
- **HTML5** – for structure and content `main.html`
- **CSS3** – for styling the map, search bar,and popups `style.css`
- **JavaScript** – to handle car brand information, map interactivity and search functionality `carinfo.js`
- **Leaflet** – JavaScript library for interactive maps
- **OpenStreetMap tiles** – for the base map layer
- **Google Images** - for car brand logos

---

## 📚 References & Help
- [Leaflet.js documentation](https://leafletjs.com/examples.html)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Google Images](https://images.google.com/)

---

## ⚖️ License

This project is licensed under the MIT License. See the [LICENSE] file for details.
