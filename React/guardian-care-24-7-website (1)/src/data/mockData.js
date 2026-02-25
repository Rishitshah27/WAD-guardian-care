// Simplified Indian-Centric Mock Data (User Side Focus)

export const serviceCategories = [
  { id: 1, name: 'Childcare', icon: '👶', description: 'Expert nannies & babysitters' },
  { id: 2, name: 'Elderly Care', icon: '👴', description: 'Compassionate senior care' },
  { id: 3, name: 'Medical Assistance', icon: '⚕️', description: 'Nursing & health support' },
  { id: 4, name: 'Physiotherapy', icon: '💪', description: 'Rehabilitation services' },
];

export const serviceProviders = [
  {
    id: 1,
    name: 'Sunita Sharma',
    image: 'https://via.placeholder.com/300x300?text=Sunita+Sharma',
    serviceType: 'Childcare',
    experience: 8,
    location: 'Mumbai, MH',
    phone: '+91 98765 43210',
    availability: 'Available',
    rating: 4.9,
    reviews: 124,
    hourlyRate: 500, // Monthly/Hourly in ₹
    bio: 'Certified nanny with 8 years of experience in early child development.',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    image: 'https://via.placeholder.com/300x300?text=Rajesh+Kumar',
    serviceType: 'Elderly Care',
    experience: 12,
    location: 'New Delhi, DL',
    phone: '+91 91234 56789',
    availability: 'Available',
    rating: 4.8,
    reviews: 215,
    hourlyRate: 450,
    bio: 'Experienced caregiver specializing in dementia and mobility support.',
  },
  {
    id: 3,
    name: 'Priya Singh',
    image: 'https://via.placeholder.com/300x300?text=Priya+Singh',
    serviceType: 'Medical Assistance',
    experience: 6,
    location: 'Bangalore, KA',
    phone: '+91 82345 67890',
    availability: 'Busy',
    rating: 4.7,
    reviews: 89,
    hourlyRate: 800,
    bio: 'Registered nurse available for home visits and medication management.',
  },
  {
    id: 4,
    name: 'Dr. Amit Patel',
    image: 'https://via.placeholder.com/300x300?text=Dr+Amit+Patel',
    serviceType: 'Physiotherapy',
    experience: 10,
    location: 'Chennai, TN',
    phone: '+91 73456 78901',
    availability: 'Available',
    rating: 5.0,
    reviews: 156,
    hourlyRate: 1200,
    bio: 'Specialist in geriatric physiotherapy and post-surgery rehabilitation.',
  },
];

export const testimonials = [
  {
    id: 1,
    author: 'Rahul Mehta',
    rating: 5,
    text: 'Sunita is a blessing! She takes such good care of our twins. Highly recommended.',
    service: 'Childcare',
    date: '2024-02-10',
  },
  {
    id: 2,
    author: 'Sneha Gupta',
    rating: 5,
    text: 'Rajesh was incredibly patient with my father. Service was professional and kind.',
    service: 'Elderly Care',
    date: '2024-02-05',
  },
];

export const userBookings = [
  {
    id: 1,
    serviceType: 'Childcare',
    provider: 'Sunita Sharma',
    date: '2024-02-15',
    time: '10:00 AM',
    status: 'Completed',
    amount: 2500, // INR
  },
  {
    id: 2,
    serviceType: 'Elderly Care',
    provider: 'Rajesh Kumar',
    date: '2024-02-20',
    time: '02:00 PM',
    status: 'Scheduled',
    amount: 1800,
  },
];

export const dashboardStats = {
  totalBookings: 2,
  completedServices: 1,
  upcomingServices: 1,
  avgRating: 4.8,
  totalSpent: 4300, // Total in ₹
};

// Removed adminStats as this is User-Side Backend only
