# TPX Remaster

A modern web application for the Phantom Phoenix Discord gaming community, focused on League of Legends statistics and tournament tracking.

## 🌐 Live Demo

Visit the site: [https://phantomphoenix.org](https://phantomphoenix.org)

## 📝 Project Overview

This website presents various League of Legends statistics for accounts of different community members, utilizing the Riot API. It also displays upcoming Clash tournaments and other relevant information for our Discord gaming community.

## 🚩 Features

- Member profiles with League of Legends stats
- Integration with Riot API for real-time data
- Upcoming Clash tournament schedule
- Admin panel for managing members and accounts
- Secure authentication and role-based access
- Responsive, modern UI
- Separate Dev and production build

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (with Flyway migrations)
- **APIs:** Riot Games API
- **Other:** Docker, Cloudinary (for image hosting), Nginx

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dijamg/TPX-site
   cd TPX-site
   ```
2. **Install dependencies:**
   - For frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For backend:
     ```bash
     cd /backend
     npm install
     ```
3. **Configure environment variables:**
   - Copy `project.env.example` to `project.env` in root and `.env.example` to `.env` in backend folder and fill in the required values (API keys, database URLs, etc).
4. **Run the app:**
   - Using Docker Compose (recommended):
     ```bash
     docker-compose up --build
     ```
   - Or run frontend and backend separately for development.

## 🙏 Credits

- Built and maintained by the Phantom Phoenix community.
- League of Legends data provided by the [Riot Games API](https://developer.riotgames.com/).

---

For questions, suggestions, or to join our community, visit [phantomphoenix.org](https://phantomphoenix.org) or our Discord server!