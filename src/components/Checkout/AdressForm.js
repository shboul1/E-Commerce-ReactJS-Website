import React, {useState, useEffect} from 'react'
import { useForm, FormProvider } from "react-hook-form";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import CustomTextField from './CustomTextField';
import commerce from '../lib/commerce';
import { Link } from 'react-router-dom'

const AdressForm = ({checkoutToken, next}) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id:code, label: name}))
    const options = shippingOptions.map(option => ({id: option.id, label:`${option.decription} - (${option.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptitions = async (checkoutTokenId, country, region=null) => {
        const optitions = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        setShippingOptions(optitions);
        setShippingOption(optitions[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    },[])

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    },[shippingCountry])

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptitions(checkoutToken.id, shippingCountry, shippingSubdivision );
    },[shippingSubdivision])

    return (
        <>
           <Typography variant='h6' gutterBottom>Shipping Adress</Typography>
           <FormProvider {...methods}> 
               <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                   <Grid container spacing={3}>
                       <CustomTextField required name='firstName' label='First Name'/>
                       <CustomTextField required name='lastName' label='Last Name'/>
                       <CustomTextField required name='Adress' label='Adress line 1'/>
                       <CustomTextField required name='email' label='Email'/>
                       <CustomTextField required name='city' label='City'/>
                       <CustomTextField required name='zip' label='Zip / Postal Code'/>
                       <Grid item xs={12} sm={6}>
                           <InputLabel>Shipping Country</InputLabel>
                           <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)} >
                              {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>{country.label}</MenuItem>
                              ))}
                           </Select>
                       </Grid>
                       <Grid item xs={12} sm={6}>
                           <InputLabel>Shipping Subdivisions</InputLabel>
                           <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)} >
                              {subdivisions.map((subdivision) => (
                                <MenuItem key={subdivision.id} value={subdivision.id}>{subdivision.label}</MenuItem>
                              ))}
                           </Select>
                       </Grid>


                       <Grid item xs={12} sm={6}>
                           <InputLabel>Shipping Optitions</InputLabel>
                           <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)} >
                              {options.map((opt) => (
                                <MenuItem key={opt.id} value={opt.id}>{opt.label}</MenuItem>
                              ))}
                           </Select>
                       </Grid>


                   </Grid>
                   <br />
               <br />
               <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                   <Button component={Link} to='/cart' variant='outlined'>Back to CART</Button>
                   <Button variant='contained' color='primary' type='submit' >NEXT</Button>
               </div>
               </form>
               
           </FormProvider>
        </>
    )
}

export default AdressForm
