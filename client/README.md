# My Task Board Client

The frontend application for the My Task Board project, built with **React**, **Tailwind CSS**, and **Zustand**.

## 🛠️ Tech Stack

- **React 19**: Modern UI library with the latest features.
- **Tailwind CSS v4**: Utility-first CSS framework for rapid styling.
- **Zustand**: Lightweight state management.
- **Vite**: Next Generation Frontend Tooling.
- **Lucide React**: Beautiful & consistent icons.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- The backend server running on port 4000 (see server README)

### Installation

1.  Navigate to the client directory:

    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Development Server

To start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

To build the application for production:

```bash
npm run build
```

to preview the production build:

```bash
npm run preview
```

## ⚙️ Configuration

The application uses environment variables for configuration.

1.  Copy the example environment file:

    ```bash
    cp .env.example .env
    ```

2.  Update the `.env` file with your backend URL:
    ```env
    VITE_API_URL=http://localhost:4000/api
    ```

If `VITE_API_URL` is not set, it defaults to `http://localhost:4000/api`.
