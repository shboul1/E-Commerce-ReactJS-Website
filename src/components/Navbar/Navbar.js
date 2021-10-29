import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom';
const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
        <AppBar position='fixed' className={classes.appBar} color='inherit'>
            <Toolbar>
                <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                <i className="fas fa-store" style={{paddingRight: '10px'}}></i> Shboul E-commerce 
                </Typography>
                <div className={classes.grow} />
                
                {location.pathname !== '/cart' && (
                <div className={classes.button}>
                    <IconButton color='inherit'>
                    <Badge component={Link} to='/cart' badgeContent={totalItems} color='secondary' style={{color:"black"}}>
                        <ShoppingCart />
                    </Badge>
                    </IconButton>
                </div> )}

            </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar
