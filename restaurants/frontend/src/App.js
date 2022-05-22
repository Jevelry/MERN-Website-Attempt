import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/home/home"
import Form from "./components/form/form"
import Restaurants from "./components/table/restaurants"
import Info from "./components/info/info"

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function App() {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    }); 
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
  
  return (
  <div className='App'>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form setOpen = {setOpen}/>} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/getRestaurant/:name/:location" element={<Info />} />
        </Routes>
      </Suspense>
    </Router>

    <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Success
        </Alert>
    </Snackbar>
  </div>

  );
}
export default App;
