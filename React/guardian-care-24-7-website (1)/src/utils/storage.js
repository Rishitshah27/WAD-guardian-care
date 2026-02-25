
import { serviceProviders, serviceCategories, testimonials, userBookings } from '../data/mockData';

const STORAGE_KEYS = {
    PROVIDERS: 'guardian_care_providers',
    CATEGORIES: 'guardian_care_categories',
    REVIEWS: 'guardian_care_reviews',
    BOOKINGS: 'guardian_care_bookings',
    INITIALIZED: 'guardian_care_initialized'
};

/**
 * Initializes localStorage with data from mockData if it's the first time running
 */
export const initStorage = () => {
    if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
        localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(serviceProviders));
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(serviceCategories));
        localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(testimonials));
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(userBookings));
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
        console.log('Storage initialized with mock data');
    }
};

/**
 * Generic function to get data from localStorage
 * @param {string} key 
 * @returns {Array} data
 */
const getData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

/**
 * Generic function to save data to localStorage
 * @param {string} key 
 * @param {Array} data 
 */
const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Providers
export const getProviders = () => getData(STORAGE_KEYS.PROVIDERS);

// Bookings
export const getBookings = () => getData(STORAGE_KEYS.BOOKINGS);
export const addBooking = (booking) => {
    const bookings = getBookings();
    const newBooking = {
        ...booking,
        id: Date.now(),
        status: 'Scheduled',
        amount: Math.floor(Math.random() * 2000) + 500 // Mock amount
    };
    const updatedBookings = [newBooking, ...bookings];
    saveData(STORAGE_KEYS.BOOKINGS, updatedBookings);
    return newBooking;
};

// Reviews
export const getReviews = () => getData(STORAGE_KEYS.REVIEWS);
export const addReview = (review) => {
    const reviews = getReviews();
    const newReview = {
        ...review,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
    };
    const updatedReviews = [newReview, ...reviews];
    saveData(STORAGE_KEYS.REVIEWS, updatedReviews);
    return newReview;
};

// --- AUTHENTICATION ---

const USERS_KEY = 'guardian_care_users';
const SESSION_KEY = 'guardian_care_session';

export const getUsers = () => getData(USERS_KEY);

export const signUp = (userData) => {
    const users = getUsers();
    if (users.find(u => u.email === userData.email)) {
        throw new Error('User already exists with this email');
    }
    const newUser = { ...userData, id: Date.now() };
    saveData(USERS_KEY, [...users, newUser]);
    // Auto-login after signup
    saveData(SESSION_KEY, newUser);
    return newUser;
};

export const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    saveData(SESSION_KEY, user);
    return user;
};

export const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    window.location.reload(); // Refresh to update UI
};

export const getCurrentUser = () => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
};
