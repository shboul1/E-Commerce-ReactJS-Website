import React from 'react'
import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@material-ui/core'
import useStyles from './styles' 
const CartItem = ({item, handleUpdateCartQty, handleRemoveFromCart}) => {
    const classes = new useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant='h6'>{item.name}</Typography>
                <Typography variant='h6'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                    <Button type='button' variant='contained' color='secondary' onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default CartItem
