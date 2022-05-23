import { useParams, useNavigate } from "react-router-dom"
import { useEffect,useState } from "react";
import axios from "axios";
import './info.css'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Info = () => {
    const navigate = useNavigate()
    const [restaurants, setRestaurants] = useState([]);
    const { name,location } = useParams();

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = () => {
        axios({
            method: 'get',
            url:`https://jevelry-restaurants.herokuapp.com/name/${name}/location/${location}`,
            headers : {
            "Content-Type":"application/json",  
            },
        }).then((res) => {
            setRestaurants(res.data)
        })

    }
    
    return (
        <div>
            
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Suburb</StyledTableCell>
            <StyledTableCell align="right">Date Visited</StyledTableCell>
            <StyledTableCell align="right">Comments</StyledTableCell>
            <StyledTableCell align="right">Score</StyledTableCell>
            <StyledTableCell align="right">Written by</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((row) => (
            <StyledTableRow key={row[0]} className='row'>
              <StyledTableCell component="th" scope="row">{row[0]}</StyledTableCell>
              <StyledTableCell align="right">{row[1]}</StyledTableCell>
              <StyledTableCell align="right">{row[2]}</StyledTableCell>
              <StyledTableCell align="right">{row[3]}</StyledTableCell>
              <StyledTableCell align="right">{row[4]}</StyledTableCell>
              <StyledTableCell align="right">{row[5]}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>




            <div className='button'>
                <Button className='button' variant="contained" color="error" onClick={() => {navigate('/restaurants')}}>
                    Go Back
                </Button>
                <Button  className='button' variant="contained" color="success" onClick={() => {navigate('/')}}>
                    Return Home
                </Button>
            </div>

        </div>
    )

}

export default Info