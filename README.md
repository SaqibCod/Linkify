# 🔗 Linkify

Linkify is a premium, feature-rich URL shortener application featuring an interactive 3D landing page, user-specific analytics, and a dynamic subdomain redirection architecture.

It is split into a **Spring Boot** backend running on Java 23 and a **React + Vite** frontend utilizing TailwindCSS v4, Three.js, and Framer Motion.

---

## 🌟 Key Features

- **URL Shortening:** Generate clean, short alias codes for long URLs.
- **Intelligent Subdomain Redirection:** Direct navigation using subdomains (e.g., `url.localhost/:code`) which transparently forwards traffic through the backend redirect controller.
- **Advanced Dashboard:** Access personal metrics including total click counts, link-by-link click logs, and interactive chart visualizations.
- **Secured with JWT:** Register and authenticate securely with Spring Security and JWT (JSON Web Tokens).
- **Modern & Dynamic UI:** Built using TailwindCSS v4, Framer Motion animations, Lucide React icons, and React Three Fiber 3D elements for a visually stunning interface.

---

## 🛠️ Tech Stack

### Backend
- **Core:** Java 23, Spring Boot 4.x
- **Security:** Spring Security, JSON Web Tokens (JJWT 0.12.6)
- **Data & DB:** Spring Data JPA, Hibernate, MySQL, MySQL Connector
- **Build Tool:** Maven

### Frontend
- **Core Framework:** React 19, Vite
- **Styling:** TailwindCSS v4, Material UI (MUI), Emotion
- **Animations & 3D:** Three.js, React Three Fiber (R3F), Motion (Framer Motion v12)
- **State & Data Fetching:** TanStack React Query, Axios
- **Charts:** Chart.js, React-Chartjs-2
- **Utilities:** Day.js, Lucide Icons, React Hot Toast, React Hook Form

---

## 📁 Project Structure

```text
Linkify/
├── Backend/
│   └── Linkify/                    # Spring Boot Application Root
│       ├── src/main/java/com/saq/Linkify/
│       │   ├── controller/         # Auth, Redirect & UrlMapping controllers
│       │   ├── dtos/               # Request/Response data transfer objects
│       │   ├── model/              # JPA Entities (User, UrlMapping, ClickEvent)
│       │   ├── repository/         # Spring Data JPA Repository interfaces
│       │   ├── security/           # JWT utilities, filters, and CORS configs
│       │   └── service/            # Core business logic handlers
│       ├── src/main/resources/     # Application configurations & static assets
│       └── pom.xml                 # Maven dependency & plugin config
│
└── Frontend/
    └── linkify-frontend/           # React + Vite Client Root
        ├── src/
        │   ├── api/                # API service definitions (Axios-based client)
        │   ├── components/         # Landing, Login, Register, & Dashboard views
        │   ├── contextApi/         # Global state & Theme management
        │   ├── hooks/              # Custom TanStack React Query hooks
        │   ├── utils/              # Helper functions & subdomain routers
        │   ├── App.jsx             # Root React component
        │   └── main.jsx            # Vite index entry
        ├── .env                    # Client environment configuration
        └── package.json            # NPM dependencies & scripts
```

---

## 🚀 Setup & Local Installation

### 1. Database Setup
1. Ensure you have **MySQL** installed and running on your system.
2. Log into MySQL and create a database named `linkifydb`:
   ```sql
   CREATE DATABASE linkifydb;
   ```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend/Linkify
   ```
2. Open `src/main/resources/application.properties` and verify your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/linkifydb
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   
   # JWT Settings
   jwt.secret=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0
   jwt.expiration=172800000
   
   # Frontend URL (For CORS configuration)
   frontend.url=http://localhost:5173
   ```
3. Run the Spring Boot application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   *Note: Hibernate is set to `update` mode, so it will automatically generate all necessary database tables on first boot.*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd Frontend/linkify-frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Verify your environment configurations in `.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:8080
   VITE_REACT_SUBDOMAIN=http://url.localhost:5173
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 4. Local Subdomain Configuration
To test the dynamic redirection (`url.localhost`) locally, you must point the subdomain to your localhost address.

On **Windows**, add the following lines to your hosts file (located at `C:\Windows\System32\drivers\etc\hosts` running as Administrator):
```text
127.0.0.1       localhost
127.0.0.1       url.localhost
```
Once added, you can access the main client app at `http://localhost:5173` and the shortened links will redirect via `http://url.localhost:5173/:code`.

---

## 📡 API Reference

### Authentication Endpoints (Public)
- `POST /api/auth/public/register` - Register a new user account.
  - *Request Body:* `{"username": "...", "email": "...", "password": "..."}`
- `POST /api/auth/public/login` - Authenticate and receive a JWT.
  - *Request Body:* `{"username": "...", "password": "..."}`

### URL Management (Protected - JWT Required)
- `POST /api/urls/shortner` - Create a short URL.
  - *Request Body:* `{"originalUrl": "https://example.com/long-page"}`
- `GET /api/urls/myurls` - Retrieve all shortened URLs generated by the authenticated user.

### Analytics (Protected - JWT Required)
- `GET /api/urls/analytic/{shortUrl}` - Retrieve detailed click logs for a specific shortened link.
  - *Query Params:* `startDate` (ISO Local DateTime), `endDate` (ISO Local DateTime)
- `GET /api/urls/totalclick` - Fetch click aggregation metrics over a timeline.
  - *Query Params:* `startDate` (ISO LocalDate), `endDate` (ISO LocalDate)

### Direct Redirection (Public)
- `GET /{shortUrl}` - Redirects the client directly using a `302 Found` header containing the original URL destination while recording click events.
