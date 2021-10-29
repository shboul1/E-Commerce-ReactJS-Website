import {Grid} from '@material-ui/core';
import Product from './Product/Product'
import useStyles from './styles'
import {useState} from 'react'

function Products({products, handleAddToCart}) {
    const classes = useStyles();
    const [search, setSearch] = useState('')
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <input type="text" placeholder='Search' style={{padding: '20px', margin: '20px 0', border:"1px solid #3f51b5", outline:"none", fontSize: '13px' }} onChange={e => setSearch(e.target.value)} />
            <Grid container justifyContent="center" spacing={4}>
            {products.filter(val => {
                if (search === '') {
                    return val
                } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
                    return val
                }
            }).map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} handleAddToCart={handleAddToCart} />
            </Grid>
            ))}
            </Grid>
        </main>
    )
}

export default Products
