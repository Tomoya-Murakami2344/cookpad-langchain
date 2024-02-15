// import '../styles/globals.css';
import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import '../components/globals.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
        <Component {...pageProps} />
        </Layout> 
    );
}