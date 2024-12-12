# Overview
### My Movie Database is a web application that enables users to discover movies, manage their watchlist, and view details like genres, ratings, and release dates. The app integrates with the TMDB API to fetch movie data and provides a user-friendly interface for seamless navigation.
> [!IMPORTANT]
> The main focuson this Project was to see if I could utilize the Client and Server communication.  With the assistance of TMDB I was able to initially gather all the needed details for movies to apply and pull to my website using an API.  But then using also using Client/Server with the watchlist to help prove that this was "do-able".

# Features
- Movie Search: Search for movies by title.
- Dynamic Movie Lists: View movies sorted by categories like "Popular", "Top Rated", and "Upcoming".
- Watchlist Management: Add and remove movies to/from your watchlist stored in MongoDB.
- Responsive Design: Optimized for desktop and mobile.
- User Profiles: Manage account settings, payment info, and view history.

# Technologies Used
- Frontend: HTML, CSS (with Tailwind CSS for some pages), JavaScript.
- Backend: Node.js, Express.js, MongoDB.
- API Integration: The Movie Database (TMDB) API for fetching movie data.
- Styling: Tailwind CSS and custom CSS for responsiveness and interactivity.

# Installation and Setup
## Prerequisites
### 1. Node.js and npm installed on your system.
### 2. MongoDB instance running locally or on a cloud service like MongoDB Atlas.

# Usage
-  Search Movies: Use the search bar to find movies by title.
-  Explore Categories: Click on category buttons (e.g., "Upcoming", "Popular") to view categorized lists.
- manage Watchlist:
    - Add movies to your watchlist by clicking the "Add to Watchlist" icon.
    - View your watchlist from the profile page or the main navigation bar.

### 4. User Profiles: Access the profile page to manage your account and preferences.

# File Structure:
![2024-12-04_11h39_03](https://github.com/user-attachments/assets/fe012a50-c098-4ae7-81f6-5e4000192e7e)

# Class Diagrams for Client side and Server Side
## Server Class Diagram:
![2024-12-12_01h42_56](https://github.com/user-attachments/assets/bb009d00-a98b-486a-b791-fd487b60eb79)

## Client Class Diagram:
![2024-12-12_01h44_15](https://github.com/user-attachments/assets/34f23fcf-69ce-4621-802d-579d4d282ecc)



# Some Future Enhancements
- User authentication and role management.
- Add TV shows and people search functionalities.
- Advanced filtering options for genres, languages, etc.
- Notifications for upcoming movie releases.

# Classes
## Backend Classes (JavaScript)
### 1. UserModel (Located in User.js)

  - Represents a user in the database.
  - Fields: name, email.
  - Methods:
    - getAllUsers: Fetch all users.
    - getOneUser: Fetch a single user by ID.
    - createUser: Create a new user.
### 2. MovieModel (Located in Movie.js)

- Represents a movie in the database.
- Fields:
  - adult, backdrop_path, genre_ids, id, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count.
- Methods:
  - getAllMovies: Fetch all movies.
  - getOneMovie: Fetch a single movie by ID.
  - createMovie: Create a new movie entry.
  - deleteAMovie: Delete a movie entry by ID.
## Frontend Components
### 3. Movie Display Functions (Located in movies-search.js, index.js)

- Handles dynamic rendering of movie information.
- Functions:
  - fetchGenres: Fetches movie genres from the TMDB API.
  - fetchData: Fetches movie lists (e.g., "Popular", "Upcoming").
  - displayMovies: Dynamically creates and populates movie cards in the grid.
### 4. Watchlist Functions (Located in movies-search.js, index.js)

- Manages user watchlists.
- Functions:
  - addToWatchlist: Adds a movie to the watchlist.
  - viewWatchlist: Displays the user's watchlist.
### 5. Search Functionality (Located in movies-search.js, index.js)

- Handles the search input and fetches results from the TMDB API.
- Functions:
  - searchMovie: Fetches movies based on the search query.
  - displaySearchResults: Populates the grid with search results.
## Database Relationships
- Users and Movies:
  - Movies can be associated with user watchlists.
  - Users manage their own watchlists, which may involve many-to-many relationships.

## Relationship Diagram Concept
- UserModel is linked to MovieModel through a "watchlist" relationship.
- Frontend functions interact with backend endpoints to manage user actions and database updates.

# Micro-Interactions
Here’s a breakdown of the user-focused behaviors and interactions present in the application:

## 1. Search Functionality
- Description: Users can search for movies using the search bar.
- Interaction:
    - As the user types, the search is triggered when they press Enter or click the Search button.
    - Results are displayed dynamically in a grid.
- Files: movies-search.js, index.js.
 
## 2. Movie Categories
- Description: Users can explore categories like "Popular", "Upcoming", and "Top Rated".
- Interaction:
    - Clicking a category button fetches movies from the TMDB API and displays them in a grid.
    - Previous movies in the grid are cleared before rendering new ones.
- Files: index.js, movies-search.js.

## 3. Movie Cards
- Description: Each movie is represented as a clickable card.
- Interaction:
    - Hover Effect:
        - Hovering over a movie card reveals its description (applies a fade-in effect for the description text).
    - Click Interaction:
        - Clicking on a card updates the main banner image with the movie’s poster.
- Files: index.css, movies-search.js.

## 4. Watchlist Management
- Description: Users can add movies to their watchlist.
- Interaction:
    - Each movie card has an "Add to Watchlist" button and a star icon.
    - Clicking the star icon sends a request to add the movie to the user’s watchlist stored in MongoDB.
    - Watchlist updates are confirmed with console messages or alerts.
- Files: index.js, movies-search.js.

## 5. Responsive Design
- Description: The app layout adapts to different screen sizes.
- Interaction:
    - Grid Behavior:
        - On smaller screens, the movie grid displays one movie per row.
        - On larger screens, the grid adjusts to display multiple movies per row.
    - Sidebar Behavior:
        - The sidebar in the profile page remains accessible and functional across devices.
- Files: index.css.

## 6. User Profile Navigation
- Description: Users can navigate their profile settings, payment info, history, and watchlist.
- Interaction:
    - Clicking a sidebar option dynamically loads the relevant section in the profile content area.
- Files: profile.html, movies-search.js.

## 7. Register Page
- Description: Users can create a new account via the registration form.
- Interaction:
    - Input fields for name and email dynamically validate user input.
    - Clicking the Register button triggers the registration process.
- Files: register.html.

# Summary of Interactions
- The application is designed with a user-first approach, emphasizing visual feedback (e.g., hover effects, dynamic updates) and responsive design.
- Functional elements like search, category buttons, and the watchlist enhance usability and engagement.
