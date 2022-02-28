import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';
import { GetStaticProps } from 'next';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product } : HomeProps) {
  return (
    <>      
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
        👏<span> Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} per month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <img src="/images/avatar.svg" alt="Girl coding"/>
      </main>
     
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const price = await stripe.prices.retrieve('price_1IoX6WEsLrrP4FKO85wBkkX4')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}


// Chamadas a APIs - 3 formas:
// Client-side - quando a informação é carregada a partir de uma ação do usuário, informações não indexadas, 
// Server-side (SSR) - quando precisa de dados dinâmicos do usuário
// Static Site Generation (SSG) - gerar um único html e compartilhar esse html com todos que estão acessando a aplicação (home do blog, pagina de um produto do e-commerce - paginas iguais para todos)
// SSR - demora mais para carregar

// Exemplo: Blog
// Conteúdo (SSG)
// Comentários (Client-side) - quando a pagina tiver carregado

// getServerSideProps - SSR
// getStaticProps - SSG