import React, { useEffect, useState } from 'react'
import image from '../../assets/m5.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync } from '../../features/products/productSlice'

function Products({ product }) {

    const [quntity, setQuentity] = useState(1)
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.product.status)
    const products = useSelector((state) => state.product.products)

    console.log("isLoidnfg: ", isLoading);
    console.log("bul: ", isLoading === "loading");
    
    console.log("prdocyst: ", product);
    
    
    
    
    useEffect(() => {
        dispatch(fetchProductsAsync())
    }, [])

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
          {!(isLoading === "loading" )? ( 
                products?.map((item) => (
                        <div key={item._id} className='flex flex-col justify-center items-center 
                             max-w-sm bg-white text-black m-4 border border-slate-900'>
                            <div className='max-w-[60%]'
                            >
                                <img
                                    src={item.productImage}
                                    alt="image"

                                />
                            </div>
                            <div className='flex flex-col justify-center items-center gap-4 p-4'>
                                <p className='text-2xl font-semibold'>{item.name}</p>
                                <p className='text-2xl text-gray-500'>${item.price}</p>
                                <p className='font-semibold'>{item.about}</p>
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
                    ))) : 
                    (<div className=' h-screen flex justify-center items-center'>
                        <p className='text-2xl font-semibold text-blue-700'>Loading...</p>
                    </div>)
                }
        </div>
    )

}

export default Products
