import React from 'react'
import Head from './head';
import Nav from './nav';

export default function Layout({ children }) {
  return (
    <div>
      <Head/>
      <Nav/>
      { children }
    </div>
  )
}
