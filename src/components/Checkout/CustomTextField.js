import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'


const CustomTextField = ({required, name, label,error}) => {
    const {control} = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
            <Controller 
            render={ ({ field }) => <TextField error={error} variant="outlined" {...field} label={label} fullWidth  required={required}/>}
            control={control}      
            name={name}
/>
        </Grid>
    )
}

export default CustomTextField;