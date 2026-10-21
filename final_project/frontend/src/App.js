import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/home/Home';
import ListingDetails from './pages/listing_details/ListingDetails';
import ListingForm from './pages/listing_form/ListingForm';
import MyListings from './pages/my_listings/MyListings';
import Profile from './pages/profile/Profile';
import Properties from './pages/properties/Properties';
import Register from './pages/register/Register';

function App() {
    return (
        <div className="App">
            <ScrollToTop>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Register />} />
                    <Route path='/listings' element={<Properties />} />
                    <Route path='/listing-details/:listing_id' element={<ListingDetails />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/profile/own-listings' element={<MyListings />} />
                        <Route path='/profile/create-listing' element={<ListingForm />} />
                        <Route path='/profile/edit-listing/:listing_id' element={<ListingForm />} />
                    </Route>
                    <Route path='*' element={<h1>Not Found</h1>} />
                </Routes>
            </ScrollToTop>
            <ToastContainer position='bottom-right' autoClose={3000} />
        </div>
    );
}

export default App;
