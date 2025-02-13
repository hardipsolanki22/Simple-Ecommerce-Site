import React, { use, useEffect, useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { addProductAsync } from '../../features/products/ProductSlice'

function ProductForm() {

  const id = useId()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    price: "",
    productImage: null
    
  })
  const isLoading = useSelector(state => state.product.status)
  console.log("isLoading: ", isLoading);
  

  const handleChanage = (e) => {
    const {name, value, files} = e.target    
    const file = files && files[0]

    if (file) {
      setFormData({
        ...formData,
        [name]: file
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }


  }
  

  const submitHandler = (e) => {
   try {     
     e.preventDefault()
     const data = new FormData()
      for(const key in formData) {
        data.append(key, formData[key])
      }
     dispatch(addProductAsync(data))      
     if (isLoading === "idle") {
      navigate("/products")
    }
   } catch (error) {
    console.log(error);
   }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-indigo-500 '>
      <div className='sm:min-w-md bg-white rounded-md p-5 w-auto '>
        <div className='flex justify-center items-center m-4'>
          <p className='text-2xl font-semibold'>Product</p>
        </div>
        <form onSubmit={submitHandler}
        method='POST'
        className='w-auto'>
          <div className='flex flex-col items-start m-4'>
            <label htmlFor={id}>
              Name:
            </label>
            <input
              type="text"
              name='name'
              id={id}
              value={formData.name}
              onChange={handleChanage}
              placeholder='Enter Product Name'
              className='w-full border outline-none focus:border-sky-500 p-2 transition ease-in duration-150'
              required
            />
          </div>
          <div className='flex flex-col items-start m-4'>
            <label htmlFor={"d" + id}>
              Description:
            </label>
            <textarea
              rows={5}
              type="text"
              name='about'
              id={"d"+ id}
              value={formData.about}
              onChange={handleChanage}
              placeholder='Enter Product Description'
              className='w-full border outline-none focus:border-sky-500 px-2 transition ease-in duration-150'
              required
            />
          </div>
          <div className='flex flex-col items-start m-4'>
            <label htmlFor={"p" + id}>
              Prise:
            </label>
            <input
              type="text"
              name='price'
              id={"p" + id}
              value={formData.price}
              onChange={handleChanage}
              placeholder='Enter Product Prise'
              className='w-full border outline-none focus:border-sky-500 p-2 transition ease-in duration-150'
              required
            />
          </div>
          <div className='flex flex-col items-start m-4'>
            <label htmlFor="">
              Image:
            </label>
            <input
              type="file"
              name='productImage'
              className='border p-2 w-full'
              required
              onChange={handleChanage}
            />
          </div>
          <button  type='submit'
          disabled={isLoading === "loading"}
          className='bg-slate-800 text-white '>
           { isLoading === "loading" ? "Loading" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
