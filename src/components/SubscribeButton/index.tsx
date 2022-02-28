import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButttonProps {
    priceId: string;
}

export  function SubscribeButton({ priceId }: SubscribeButttonProps) {
    const { data: session } = useSession();
    const router = useRouter();

    async function handleSubscribe(){

        if(!session) { 
            signIn('github')
            return;
        }

        if(session.activeSubscription) {
            router.push('/posts')
            return;
        }

        try {
            const response = await api.post('/subscribe');
           /*  console.log(response); */

            const { sessionId } = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({sessionId})
        }         
        catch(e) {  
            alert(e.message);
        }

    }

    return (
        <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}
