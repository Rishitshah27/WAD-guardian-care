# Guardian Care 24/7 - Simple React App Structure

## Simplified Project Setup

### Single CSS File Approach
All styling is consolidated into **one master CSS file**: `src/index.css`
- No separate CSS files per component
- Easy to maintain and modify
- All classes and styles in one place

### Folder Structure

```
src/
├── index.css              (ONE MASTER CSS FILE - ALL STYLES)
├── index.js               (Entry point)
├── App.js                 (Main router setup)
├── components/
│   ├── Button.js
│   ├── Navbar.js
│   ├── Footer.js
│   ├── HeroSection.js
│   ├── ServiceCategoryCard.js
│   ├── ServiceProviderCard.js
│   ├── BookingForm.js
│   ├── ReviewCard.js
│   └── ReviewForm.js
├── pages/
│   ├── LandingPage.js
│   ├── ServicesPage.js
│   ├── BookingPage.js
│   ├── ReviewsPage.js
│   └── DashboardPage.js
├── data/
│   └── mockData.js        (All mock data for the app)
└── utils/
    └── xmlParser.js       (XML parsing utility for footer)

public/
├── index.html
└── footer-data.xml        (Dynamic footer content)
```

## What's Simple?

1. **One CSS File** - `src/index.css` contains ALL styling (600+ lines organized by component)
2. **No CSS Imports** - Components import only what they need (React/dependencies)
3. **Simple Routing** - React Router with 5 main pages
4. **Mock Data** - Complete data structure in `src/data/mockData.js`
5. **Reusable Components** - 9 clean, simple components

## Component List

### Core Components
- **Button** - Reusable button with variants (primary/secondary) and sizes (sm/md/lg)
- **Navbar** - Navigation with mobile menu support
- **Footer** - Dynamic footer that parses XML data
- **HeroSection** - Hero banner for landing page

### Feature Components
- **ServiceCategoryCard** - Displays service categories
- **ServiceProviderCard** - Displays individual service providers
- **BookingForm** - Form for booking services
- **ReviewCard** - Displays customer reviews
- **ReviewForm** - Form for submitting reviews

## Pages

1. **LandingPage** - Home with hero, services, features, testimonials
2. **ServicesPage** - Browse providers with filtering
3. **BookingPage** - Book specific service from provider
4. **ReviewsPage** - Read/submit reviews
5. **DashboardPage** - User dashboard with tabs

## Running the App

```bash
npm install
npm start
```

The app runs on React Router with client-side routing. No backend needed initially!
