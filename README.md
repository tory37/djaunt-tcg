# Djaunt TCG

Djaunt TCG is a web application designed for managing and displaying trading card game (TCG) decks. The application allows users to view different decks, switch between various display modes, and manage card information efficiently.

## Features

- **Deck Management**: Users can select different decks from a dropdown menu.
- **Multiple Views**: The application supports three different views for displaying cards:
  - **Full View**: Displays cards with images and detailed information.
  - **Mid View**: Displays a single image per card along with the card name, card set, and have/total count.
  - **List View**: Displays card names, card sets, and have/total counts without images.
- **Responsive Design**: The application is designed to be responsive and user-friendly across different devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling routing within the application.
- **Axios**: For making HTTP requests to fetch data from Google Sheets.
- **PapaParse**: For parsing CSV data fetched from Google Sheets.
- **CSS**: For styling the application.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository**:

   ```bash
   git clone git@github.com:tory37/djaunt-tcg.git
   cd djaunt-tcg
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**:

   ```bash
   npm start
   ```

2. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Using the Application

- **Selecting a Deck**: Click on the hamburger menu in the top right corner to select a deck from the dropdown list.
- **Switching Views**: Use the pill selector below the deck name to switch between Full, Mid, and List views.
- **Viewing Cards**: Depending on the selected view, cards will be displayed with varying levels of detail.

### Data Source

The application fetches card data from a Google Sheets document. Ensure that the URLs for the decks are correctly set in the `DeckSelector.js` component.

### Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. 

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Troubleshooting

- If you encounter issues with dependencies, try deleting the `node_modules` folder and running `npm install` again.
- Ensure that your Google Sheets document is publicly accessible if you are having trouble fetching data.

## Acknowledgments

- Thanks to the creators of React, React Router, Axios, and PapaParse for their excellent libraries that made this project possible.