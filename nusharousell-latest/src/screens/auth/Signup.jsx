import React from 'react'

export default function Signup() {

  const Signup = (e) => {
    e.preventDefault();
    console.log('Signup');
  }

  return (
    <>
      <div className='container'>
        <br/>
        <h2>Signup</h2>
        <br/>
        <form autoComplete='off' className='form-group' onSubmit={Signup}>
          <label htmlFor="name">Name</label>
          <br/>
          <input type="text" id="name" className='form-control' required />
          <br/>
          <label htmlFor="email">Email</label>
          <br/>
          <input type="email" id="email" className='form-control' required />
          <br/>
          <label htmlFor="password">Password</label>
          <br/>
          <input type="password" id="password" className='form-control' required />
          <br/>
          <button type="submit" className='btn btn-success btn-md mybtn'>Signup</button>
        </form>
      </div>
    </>
  )
}