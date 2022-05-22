import "./home.css"
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";


const Home = () =>  {



    return (
        <div className="main">


            <div className="title">
                <h1 className="name">Stay Classy </h1>
                <h1 className="desc">Restaurants</h1>
            </div>
            {/* <div className="image-wrapper">
                <img src={Logo} alt="Logo" className="image"/>
            </div> */}
            <div className="paper-wrapper">
            <Paper elevation={3} className="paper">
                <p>I've made this website with the hopes that we can one day
                look back fondly on all the memories we made. If you have any 
                suggestions or features you want to see, let me know. I'll try
                add it when I have time.
                </p>
            </Paper>

            </div>
            <div className="button-wrapper">
                <div className="button-cell">
                    <Link to={'/form'}style={{ textDecoration: 'none' }}>
                        <Button variant="contained"  >Add New</Button>
                    </Link>
                </div>
                <div className="button-cell">
                    <Link to={'/restaurants'}style={{ textDecoration: 'none' }}>
                        <Button variant="contained"  >View All</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home