import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './restaurants.css'
const Restaurants = () =>  {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.black
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    }));


    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchRestaurants();
    }, []);


    const fetchRestaurants = () => {
        axios({
            method: 'get',
            url:"https://jevelry-restaurants.herokuapp.com/getRestaurants",
            headers : {
            "Content-Type":"application/json",  
            },
        }).then((res) => {
            setRestaurants(res.data)
        })
    }
    return (
        <div className='main'>
            <div className="title">
                <h1>Restaurants</h1>  
            </div>
            <div>
            <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 100 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="centre">Suburb</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurants.map((row) => (
                            <StyledTableRow style={{cursor:'pointer'}} className='row' key={row[0]}  onClick={() => {navigate(`/getRestaurant/${row[0]}/${row[1]}`, {replace: true})}}>
                                <StyledTableCell component="th" scope="row">{row[0]}</StyledTableCell>
                                <StyledTableCell align="centre">{row[1]}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
    )
}

export default Restaurants