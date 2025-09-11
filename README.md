# Product Exit App 🛒

<p align="center">
  <a href="https://ismaelmarot.github.io/products-exit-app/#/general">
    <img 
      src="https://img.shields.io/badge/🚀%20Ir%20a%20la%20aplicación-blue?style=for-the-badge&logoWidth=30" 
      alt="Ir a la aplicación"
    >
  </a>
</p>

A modern web application built with **React**, **TypeScript**, **Vite**, and **Bootstrap**, designed for managing product exit efficiently.

---
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/Node-18.12+-blue.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-orange.svg)](https://vitejs.dev/)
---

## Features

1. **📝 General Information Input**  
   Capture essential data: Reason, Person on charge, Departure date, Return date and other relevant details.

4. **📦 Product Exit Management**  
   - Exit product details: Description, Category, Producer, Quantity, Code and Sale Price.
   - Dynamically view the list of added products  
   - Edit or remove products individually

5. **🖨️ Final Review & Export**  
   - View the complete product list  
   - Export or print the list as a PDF
   - Export the list as a .JSON

---

##🛠 Tech Stack

- **React** – Frontend library for building user interfaces  
- **TypeScript** – Strongly typed JavaScript for safer code  
- **Vite** – Fast development server with Hot Module Replacement  
- **Bootstrap** – Responsive UI components  
- **jsPDF** – PDF generation for export/printing  

---

##🚀 Getting Started

### Prerequisites

- Node.js >= 18.12
- npm or yarn

### Installation
```bash
git clone https://github.com/ismaelmarot/product-entry-app.git
cd product-entry-app
npm install
```

## Running the App
```bash
npm run dev
```
Open your browser at http://localhost:5173

---
### Project Structure
```bash
product-entry-app/
├─ src/
│  ├─ components/     # React components (forms, product list, navigation)
│  ├─ pages/          # Step-by-step pages
│  ├─ context/        # App context for global state
│  ├─ helpers/        # Utility functions
│  └─ App.tsx         # Main app entry
├─ public/            # Static assets
├─ package.json
└─ vite.config.ts
```

---

### 🤝 Contributing
1. Fork the repository

2. Create your feature branch (git checkout -b feature/my-feature)

3. Commit your changes (git commit -m "feat: my new feature")

4. Push to the branch (git push origin feature/my-feature)

5. Open a Pull Request

_Please follow the code style and naming conventions._

---
### 📝 Notes

Make sure Node.js version is compatible (>=18.12)

All added products are stored temporarily in app state

Exported PDFs are generated using jsPDF

---
### 📄 License

This project is licensed under the MIT License.
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---
### 📷 Screenshots

<img src="src/screenshots/Screenshot01.png" alt="Captura 1" />

<img src="src/screenshots/Screenshot02.png" alt="Captura 2" />

<img src="src/screenshots/Screenshot03.png" alt="Captura 3" />

<img src="src/screenshots/Screenshot04.png" alt="Captura 4" />
