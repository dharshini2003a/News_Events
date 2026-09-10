# Template 1 - Aravind Eye Care System News Portal (React)

Classic "news update" style layout, replicated from the provided template image.

## Run locally
    npm install
    npm run dev

## Build
    npm run build

## Structure
- src/data/newsData.js       -> dummy news dataset (10 items, based on the content you shared)
- src/pages/CurrentNews.jsx  -> MAIN PAGE: news list with search, category filter, pagination
- src/pages/NewsDetail.jsx   -> opens as a separate route when a news card is clicked; shows date, full content, keywords/tags, and photo gallery
- src/pages/Home.jsx, Archives.jsx, ThingalUdhayam.jsx, Contact.jsx -> layout + dummy content only
- src/pages/AdminLogin.jsx, AdminDashboard.jsx -> demo-only admin screens (no real auth, any login works)
- public/images/  -> locally generated placeholder photos (SVG) standing in for real hospital photos

No backend / database - all data lives in newsData.js (edit this file to update news items).
