import React from 'react'
import './style.scss'

const Breadcrumb = () => {
  return (
    <section className='breadcrumb__section'>
      <div className='breadcrumb__content'>
        <h1 className='breadcrumb__title'>
            <span>Sign</span>
            Up
        </h1>
        <ul className='breadcrumb__menu'>
            <li>Home</li>
            <li>{'>'}</li>
            <li>Sign Up</li>
        </ul>
      </div>
    </section>
  )
}

export default Breadcrumb
