import React from 'react'
import './Title.css'

function Title(props) {
  return (
    <section className="title-class">
    <div className="title-container">
      <div className='title-left'>
          <h1>{props.title}</h1>
      </div>
      </div>
  </section>
  )
}

export default Title