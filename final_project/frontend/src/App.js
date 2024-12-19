import { Routes, Route } from 'react-router-dom'


import Carousel from "./components/carousel/Carousel";
import Register from "./pages/register/Register";
import { images } from "./components/carousel/data";
import Home from "./pages/home/Home";
import Properties from "./pages/properties/Properties";
import ListingDetails from "./pages/listing_details/ListingDetails";
import Profile from "./pages/profile/Profile";
import MyListings from "./pages/my_listings/MyListings";
import ListingForm from "./pages/listing_form/ListingForm";
import PrivateRoute from './PrivateRoute';
import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
