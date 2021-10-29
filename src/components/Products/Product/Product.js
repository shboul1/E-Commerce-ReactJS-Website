import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles';
import {Link} from 'react-router-dom'
function Product({product, handleAddToCart}) {
    const classes = useStyles();
    return (
        
        <Card className={classes.root}>
            <CardMedia component={Link} to={'/details/' + product.id} className={classes.media} image={product.media.source} title={product.name} />
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant='h5' gutterBottom>
                        {product.name}
                        </Typography>
                        <Typography variant='h5'>
                        {product.price.formatted_with_symbol}
                        </Typography>                
                    </div>
                    <Typography variant='body1' color='textSecondary'>{product.name} ...</Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label='Add To Cart' onClick={() => handleAddToCart(product.id, 1)}>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
        </Card>
    )
}

export default Product