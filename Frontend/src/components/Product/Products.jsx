import React, { useState } from 'react'
import image from '../../assets/m5.jpg'

function Products({ product }) {

    const [quntity, setQuentity] = useState(1)

    const handleQuentityIncrement = () => {
        setQuentity((quntity) => quntity + 1)
    }

    const handleQuentityDecrement = () => {
        setQuentity((quentity) => {
            if (quentity <= 1) {
                return 1
            }
            return quentity - 1
        })
    }

    return (
        <div className="flex flex-wrap sm:flex-row flex-col justify-center items-center">
            {
                Array(product)
                    .fill()
                    .map((item, index) => (
                        <div key={index} className='flex flex-col justify-center items-center 
                             max-w-sm bg-white text-black m-4 border border-slate-900'>
                            <div className='max-w-[60%]'
                            >
                                <img
                                    src={image}
                                    alt="image"

                                />
                            </div>
                            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                                <h1>iphone 12</h1>
                                <p className='text-2xl text-gray-500'>$120000</p>
                                <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt atque provident, praesentium nemo odit quibusdam.</p>
                            </div>
                            <div className='m-4 flex gap-4 text-2xl font-bold'>
                                <p className='cursor-pointer'
                                    onClick={handleQuentityDecrement}>-</p>
                                <p>{quntity}</p>
                                <p className='cursor-pointer'
                                    onClick={handleQuentityIncrement}>+</p>
                            </div>
                            <button style={{ borderRadius: "0px" }} className='bg-black text-white w-full 
                                focus:outline-none text-center p-2'>
                                Add to Cart
                            </button>
                        </div>
                    ))}
        </div>
    )

}

export default Products
