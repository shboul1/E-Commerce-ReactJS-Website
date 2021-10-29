import commerce from '../lib/commerce';
import React, { useState, useEffect } from 'react'
import makeStyles from './styles'
import { Paper, Stepper, Step, StepLabel, Typography, Button } from '@material-ui/core'
import AdressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import {Link} from 'react-router-dom'

const steps = ['Shipping adress', 'Payment Details'];

const Checkout = ({cart}) => {
    const classes = makeStyles();
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token)
                
            } catch (error) {
                console.log(error)
            }
            
        }
        generateToken();
    }, [cart])

    const Form = () => (
        activeStep === 0 ? <AdressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm prevStep={prevStep} shippingData={shippingData} checkoutToken={checkoutToken} next={next}/>
    )
    const Confirmation = () => (
        <div style={{textAlign: 'center'}} >
            <Typography variant='h5'>Thank You For using our Store!</Typography>
        <br />
        <br />
        <div className="button" >
        <Button  variant='contained' color='primary' component={Link} to='/'>Back To Home page</Button>
        </div>
        
        
        </div>
    )

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const nextStep = () => setActiveStep((prevActionStep) => prevActionStep + 1)
    const prevStep = () => setActiveStep((prevActionStep) => prevActionStep - 1)

    return (
        <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                      </Step>
                    ))}
                </Stepper>
                {!checkoutToken ? 'Loading ...' :  activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </Paper>
        </main>
        </>
    )
}

export default Checkout
