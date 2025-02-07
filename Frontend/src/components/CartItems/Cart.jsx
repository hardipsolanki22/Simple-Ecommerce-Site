import React from 'react'
import image from '../../assets/m5.jpg'


function Cart() {
  return (
    <div className='flex justify-between items-center p-4 bg-slate-900 text-white my-4 gap-5 sm:gap-0'>
      <div className='max-w-[30%] sm:max-w-[120px]'>
        <img 
        src={image}
        className='rounded-md'
         alt="product" />
      </div>
      <div className='flex flex-col items-center justify-center gap-4'>
        <p>iphone</p>
        <p>$26253</p>
      </div>
      <div>
      <label htmlFor="quantity" className='mr-3'>
        Quantity
      </label>
      <select id="quantity" className='bg-slate-900 focus:outline-none'>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      </div>
      <button>
        X
      </button>
    </div>
  )
}

export default Cart
