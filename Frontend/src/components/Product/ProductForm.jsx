import React, { useId, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductAsync } from '../../features/products/ProductSlice'

function ProductForm() {

  const id = useId()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    prise: "",
    productImage: ""
    
  })
  const isLoading = useSelector(state => state.product.status)

  console.log("isLoading: ", isLoading);
  

  const handleChnage = (e) => {
    const {name, value, files} = e.target    
    if (name === "productImage") {      
      setFormData({
        ...formData,
        [name]: files[0]
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }

  }

  console.log(formData);
  

  const submitHandler = (e) => {
   try {     
     e.preventDefault()
     dispatch(addProductAsync(formData))
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
              onChange={handleChnage}
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
              onChange={handleChnage}
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
              name='prise'
              id={"p" + id}
              value={formData.prise}
              onChange={handleChnage}
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
              onChange={handleChnage}
            />
          </div>
          <button  type='submit'
          className='bg-slate-800 text-white '>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
