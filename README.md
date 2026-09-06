# 🎬 Movie Collection Manager

A web application for managing your personal movie collection with search functionality and local storage persistence.

## ✨ Features

- **🔍 Movie Search**: Search for movies using the OMDB API
- **📋 Collection Management**: Add movies to your personal collection
- **💾 Local Storage**: Persist your collection between browser sessions
- **🗑️ Delete Functionality**: Remove movies from your collection
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🔄 Toggle Switch**: Visual indicator for movie status (watched/unwatched)

## 📂 Project Structure

```text
movie-collection/
├── index.html          # Main search page
├── collection.html     # Collection page
├── style.css           # Styles for both pages
├── script.js           # JavaScript functionality
└── README.md           # This file
```
## 🚀 Getting Started
- **Prerequisites
- **Modern web browser (Chrome, Firefox, Safari, Edge)
- **Internet connection (for OMDB API)
- **Installation
- **Clone or download the repository
- **Open index.html in your web browser to start searching movies
- **Navigate to collection.html to view your collection
  
## 📖 Usage
- **Search Movies
- **Enter a movie title in the search box on the main page
- **Click "Search" or press Enter
- **Browse search results and click "Add to Collection" to add movies
- **Manage Collection
- **Navigate to collection.html
- **View all movies in your collection
- **Use the toggle switch to mark movies as watched/unwatched
- **Click "Delete" to remove movies from your collection
- **Local Storage
- **Your collection is automatically saved to browser's localStorage
- **Collections persist between browser sessions
- **Data is stored under the key "movieCollection"

## ⚙️ Technical Details
- **API Integration
- **Uses OMDB API (http://www.omdbapi.com/)
- **Requires API key (set in script.js)
- **Handles API rate limiting and errors gracefully
- **Storage
- **Uses localStorage for data persistence
- **Stores movie data as JSON objects
- **Automatically manages collection updates
- **Responsive Design
- **Grid layout adapts to different screen sizes
- **Mobile-friendly interface
- **Flexible card components
- 
##🎨 Customization
- **API Key
- **To use the OMDB API:

- **Get a free API key from http://www.omdbapi.com/
- **Replace the placeholder API key in script.js:
- **javascript

- **Copy
- **const API_KEY = 'your_api_key_here';
- **Styling
- **All CSS is contained in style.css. Modify this file to change:

- **Colors and themes
- **Layout dimensions
- **Responsive breakpoints
- **Animation effects
🌐 Browser Support
Browser	Minimum Version
Chrome	50+
Firefox	45+
Safari	10+
Edge	12+
🐛 Troubleshooting
Common Issues
API Key Issues:

Ensure you have a valid OMDB API key
Check that the key is properly configured in script.js
Collection Not Saving:

Verify browser supports localStorage
Check browser privacy settings
Search Not Working:

Confirm internet connection
Verify API key is valid
🤝 Contributing
Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Create a Pull Request
📄 License
This project is available as open source under the terms of the MIT License.

👤 Author
Movie Collection Manager

🙏 Acknowledgments
OMDB API for movie data
Responsive web design principles
Local storage technology
