import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsAsync, removeItemAsync, updateItemAsync } from '../../features/cart/cartSlice'


function Cart() {

  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.cart.status)
  const items = useSelector(state => state.cart.items)
  const total = items?.reduce((acc, item) => acc + item.product.price * item.quntity, 0) 


  useEffect(() => {
    dispatch(fetchItemsAsync())
  }, [])

  const removeItemHandler = (itemId) => {
    dispatch(removeItemAsync(itemId))
  }

  const handleChange = (e, itemId) => {
    dispatch(updateItemAsync({ itemId, quntity: e.target.value }))
  }
 
  return (
    <div className="flex flex-col justify-center">
      {!(isLoading === "loading") ? (
        items?.map(item => (
          <div key={item._id}
            className='flex justify-between items-center p-4 bg-slate-900 text-white my-4 gap-5 sm:gap-0'>
            <div className='max-w-[30%] sm:max-w-[120px]'>
              <img
                src={item.product.productImage}
                className='rounded-md'
                alt="product" />
            </div>
            <div className='flex flex-col items-center justify-center gap-4'>
              <p>{item.product.name}</p>
              <p>${item.product.price}</p>
            </div>
            <div>
              <label htmlFor="quantity" className='mr-3'>
                Quantity
              </label>
              <select value={item.quntity}
                onChange={(e) => handleChange(e, item._id)}
                className='bg-slate-900 focus:outline-none'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button onClick={() => removeItemHandler(item._id)}>
              X
            </button>
          </div>
        ))
      ) : (<div className=' h-screen flex justify-center items-center'>
        <p className='text-2xl font-semibold text-blue-700'>Loading...</p>
      </div>)
      }
     <div className='flex flex-col justify-center items-center my-4'>
           <p className='text-2xl font-bold p-5 border border-slate-600 text-black'>Total: ${total}</p>
         </div>
    </div>
  )

}

export default Cart
