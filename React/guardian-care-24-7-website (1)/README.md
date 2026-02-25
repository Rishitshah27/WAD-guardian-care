# Guardian Care 24/7 - React Application

A professional service booking platform built with React, React Router, and modern CSS. This application allows users to browse service providers, book appointments, submit reviews, and manage their dashboard.

## Project Structure

```
guardian-care-react/
├── public/
│   ├── index.html              # Main HTML file
│   └── footer-data.xml         # XML data for dynamic footer
├── src/
│   ├── components/             # Reusable React components
│   │   ├── Navbar.js          # Navigation bar
│   │   ├── Footer.js          # Footer with XML parsing
│   │   ├── Button.js          # Reusable button component
│   │   ├── HeroSection.js     # Hero banner
│   │   ├── ServiceCategoryCard.js
│   │   ├── ServiceProviderCard.js
│   │   ├── ReviewCard.js
│   │   ├── BookingForm.js
│   │   └── ReviewForm.js
│   ├── pages/                  # Page components
│   │   ├── LandingPage.js
│   │   ├── ServicesPage.js
│   │   ├── BookingPage.js
│   │   ├── ReviewsPage.js
│   │   └── DashboardPage.js
│   ├── styles/                 # CSS files
│   │   ├── Button.css
│   │   ├── Navbar.css
│   │   ├── Footer.css
│   │   ├── HeroSection.css
│   │   ├── ServiceCard.css
│   │   ├── ReviewCard.css
│   │   ├── BookingForm.css
│   │   ├── ReviewForm.css
│   │   ├── LandingPage.css
│   │   ├── ServicesPage.css
│   │   ├── BookingPage.css
│   │   ├── ReviewsPage.css
│   │   └── DashboardPage.css
│   ├── data/
│   │   └── mockData.js         # Mock data for development
│   ├── utils/
│   │   └── xmlParser.js        # XML parsing utility
│   ├── App.js                  # Main app component with routing
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

## Features

### Pages

1. **Landing Page** (`/`)
   - Hero section with call-to-action
   - Service categories grid
   - Features showcase
   - Customer testimonials
   - Call-to-action section

2. **Services Discovery** (`/services`)
   - Browse all service providers
   - Filter by category and availability
   - Service provider cards with ratings
   - Quick booking access

3. **Booking Page** (`/booking/:providerId`)
   - Provider details and information
   - Booking form with date/time selection
   - Emergency booking toggle
   - Service address input

4. **Reviews** (`/reviews`)
   - Display all customer reviews
   - Statistics (average rating, total reviews)
   - Review submission form
   - Star rating system

5. **Dashboard** (`/dashboard`)
   - Overview statistics
   - Booking management
   - Account settings
   - Booking history with status tracking

## Components

### Reusable Components

- **Navbar**: Responsive navigation with mobile toggle
- **Footer**: Dynamic footer with XML data parsing
- **Button**: Styled button component with variants (primary, secondary) and sizes
- **HeroSection**: Hero banner for pages
- **ServiceCategoryCard**: Card component for service categories
- **ServiceProviderCard**: Provider card with details, rating, and booking button
- **ReviewCard**: Display individual customer reviews
- **BookingForm**: Form for booking services
- **ReviewForm**: Form for submitting reviews

## XML Footer Implementation

The footer content is loaded dynamically from an XML file (`public/footer-data.xml`). The React component (`src/components/Footer.js`) uses the `xmlParser.js` utility to:

1. Fetch the XML file
2. Parse it using the DOM parser
3. Extract company info, links, social media, and contact details
4. Render the footer dynamically

This approach allows updating footer content without modifying the React code.

## Styling

- **CSS Variables**: Global color scheme defined in `src/index.css`
- **Responsive Design**: Mobile-first approach with media queries
- **Color Palette**:
  - Primary: #0066cc (Blue)
  - Secondary: #00a8cc (Cyan)
  - Background: #f8f9fa (Light Gray)
  - Text: #1a2332 (Dark Blue)

## Mock Data

The application uses mock data in `src/data/mockData.js` for:
- Service categories
- Service providers
- Testimonials
- User bookings
- Dashboard statistics
- Admin statistics

This allows the app to work standalone without a backend, ready for API integration.

## Routing

Routes configured using React Router v6:

```
/ → LandingPage
/services → ServicesPage
/booking/:providerId → BookingPage
/reviews → ReviewsPage
/dashboard → DashboardPage
/emergency → ServicesPage (filters for emergency services)
```

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The app will run on `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Technologies Used

- **React** 18.2.0
- **React Router DOM** 6.20.0
- **Vanilla CSS** (no CSS-in-JS)
- **XML Parsing** using DOM Parser API

## Design

- Professional healthcare-inspired theme
- Trust-building design with soft colors
- Rounded corners and minimal shadows
- Responsive and accessible UI
- Clean typography and spacing

## Future Enhancements

1. **Backend Integration**: Replace mock data with API calls
2. **Authentication**: Implement user authentication
3. **Payments**: Add payment processing for bookings
4. **Real-time Updates**: WebSocket for live provider availability
5. **Admin Panel**: Full admin functionality
6. **Mobile App**: React Native version
7. **Notifications**: Email and push notifications
8. **Search**: Full-text search for providers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - See LICENSE file for details

## Contact

Guardian Care 24/7
Email: support@guardiancare.com
Phone: 1-800-GUARDIAN
