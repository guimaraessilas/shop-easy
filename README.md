# Online Store Mock Project

This project is a cross-platform app (Android, iOS, and web) of an online store mock built using Expo with React Native.

## Prerequisites

- **Node.js** (>= 20.x)
- **NPM** (>= 10.8.x)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/guimaraessilas/shop-easy.git
   ```

   ```bash
   cd shop-easy
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

## Running the Project

To start the app in development mode:

```bash
npx expo start
```

This will open the Expo developer tools in the terminal, allowing you to select an emulator, run on the web, or scan the QR code to run the app on your mobile device.

### Login Credentials

- **Username**: emilys
- **Password**: emilyspass

## Features

The project emulates an online store and includes the following features:

1. **Authentication**: Allows the user to log in using credentials. Implemented with React Query, Zustand, SecureAsyncStore, and Axios to manage state, HTTP requests, and caching.

2. **Product List**: Displays a list of available products. Implemented using Expo Router navigation, which organizes the app's pages.

3. **Product Editing**: Allows the user to edit the details of a specific product by clicking on it in the list.

4. **Product Addition**: Allows the user to add new products to the store.

5. **Local Session Storage**: Uses Zustand to maintain the logged-in user's state and React Query to manage data caching, providing a smooth experience.

## Project Structure

- **src/components**: Contains reusable interface components.
- **src/hooks**: Contains custom hooks, such as those used for authentication.
- **src/app**: Contains the main pages, organized according to Expo Router.
- **src/store**: Contains Zustand configuration for state management.

## Built With

- **[Expo](https://docs.expo.dev/)**
- **[Expo Router](https://docs.expo.dev/router/introduction/)**
- **[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)**
- **[React Query](https://zustand.docs.pmnd.rs/getting-started/introduction)**
- **[Gluestack](https://gluestack.io/ui/docs/home/overview/introduction)**
- **[Axios](https://axios-http.com/docs/intro)**
- **[React Native Tab View](https://reactnavigation.org/docs/tab-view/)**

## Author

**Silas Guimarães Rineiro**

You can find me on:

- **[LinkedIn](https://www.linkedin.com/in/silas-guimar%C3%A3es-65b8b6120/)**
- **[Medium](https://medium.com/@guimaraessilas)**
- And here on **[Github](https://github.com/guimaraessilas)**

---
