import React from 'react'
import { useParams } from 'react-router'
import {Grid, Typography, Button } from '@material-ui/core'
import {Link} from 'react-router-dom'
const Details = ({products, handleAddToCart}) => {
    const { id } = useParams();
    return (
        <div style={{padding: '200px 0'}}>
            {
                products.map((product, idx) => (
                    <>
                    {product.id === id ? (
                        <Grid key={idx} container>
                            <Grid item style={{textAlign:'center'}} xs={12} sm={6}><img style={{maxWidth: '80%', maxHeight: '80%'}} src={product.media.source} alt={product.name} /></Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant='h5'>{product.name}</Typography>
                                <Typography style={{padding: "10px 0"}} variant='h5' color="primary">Price : {product.price.formatted_with_symbol}</Typography>
                                <Typography style={{padding: "20px 0", width: '50%'}} variant='h6' dangerouslySetInnerHTML={{__html: product.description}}></Typography>
                                <div style={{display:'flex', justifyContent:'start', padding: '50px 0'}}>
                            <Button component={Link} to='/' variant='contained' color='primary' style={{marginRight:'10px'}}>Back to home</Button>
                            <Button variant='contained' color='secondary' onClick={() => handleAddToCart(product.id, 1)}>Add to Cart</Button>
                            </div>
                            </Grid>
                            
                        </Grid>
                        
                    ): ""}</>
            ))
            }
        </div>
    )
}

export default Details
