import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import React from "react";
import './form.css'
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import { Grid, Paper,Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const Form = ({setOpen}) =>  {
    const { register, handleSubmit } = useForm();
    const [member, setMember] = useState('');
    const navigate = useNavigate();


    
    const onSubmit = data => {
        setOpen(true);
        const userObject = {
            name: data.name,
            location: data.location,
            date: data.date,
            comments: data.comments,
            score: data.score,
            author:data.author
        }

        axios({
            method: 'post',
            url:"https://jevelry-restaurants.herokuapp.com/submit",
            
            headers : {
            "Content-Type":"application/json",  
            },
            data : JSON.stringify(userObject)
        })
        navigate('/', {replace: true})
    }
    // For the select part
    const handleChange = (event) => {
        setMember(event.target.value);
    };
    return (
        <div className="main">
        <Typography variant="h6" align="center" margin="dense">
            <p className="title">Add New Restaurant</p>
          </Typography>
             <Paper className='main'>
                <Box px={3} py={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                {...register("name")}
                                label="Name of Restaurant"
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                {...register("location")}
                                label="Suburb"
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                {...register("date")}

                                label="Date Visited (dd/mm/yyyy)"
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                {...register("comments")}
                                label="Thoughts? (optional)"
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                {...register("score")}
                                label="Score out of 10"
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Stay Classy Member</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-helper-label"
                                        {...register("author")}
                                        id="demo-simple-select-helper"
                                        label="Stay Classy Member"
                                        value={member}
                                        onChange={handleChange}
                                        >
                                            <MenuItem value={'Angus'}>Angus</MenuItem>
                                            <MenuItem value={'Eddy'}>Eddy</MenuItem>
                                            <MenuItem value={'Jarrod'}>Jarrod</MenuItem>
                                            <MenuItem value={'Jeff'}>Jeff</MenuItem>
                                            <MenuItem value={'Kevin'}>Kevin</MenuItem>
                                            <MenuItem value={'Nigel'}>Nigel</MenuItem>
                                            <MenuItem value={'Zac'}>Zac</MenuItem>

                                        </Select>
                                </FormControl>
                            </Grid>
                        
 
                    </Grid>
                    <div className='button-wrapper'>
                        <Button size="large" 
                                variant="contained"
                                color="success"
                                onClick={handleSubmit(onSubmit)}
                                >
                                <p className='text'>Submit</p>
                        </Button>
                    </div>
                </Box>  
             </Paper>


        </div>
    )
}

export default Form