import { GetStaticProps, GetStaticPaths} from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";
import styles from '../post.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect }  from "react";

interface PostsPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostsPreview({ post }: PostsPreviewProps) {

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main  className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        dangerouslySetInnerHTML={{ __html: post.content }} 
                        className={styles.postContent}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading ?
                        <Link href="/">
                            <a>Subscribe now</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    
    return{
        paths: [],
        fallback:'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const { slug } = params;

    const prismic = getPrismicClient()
    const response = await prismic.getByUID<any>('post', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post,
        },      
    }
}