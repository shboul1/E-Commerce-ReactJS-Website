import React from 'react'
import { useForm, FormProvider } from "react-hook-form";
import Review from './Review'
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
const PaymentForm = ({checkoutToken , prevStep, next}) => {
    const stripePromise = loadStripe('...');
    const methods = useForm();
    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
            <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit((data) => next({...data}))}>
                            <CardElement />
                            <br /> <br />
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant='outlined' onClick={prevStep}>Back</Button>
                                <Button variant='contained' color='primary' type='submit'>Pay {checkoutToken.live.subtotal.formatted_with_symbol}</Button>
                            </div>
                        </form>
            </FormProvider>
            </Elements>
        </>
    )
}

export default PaymentForm
