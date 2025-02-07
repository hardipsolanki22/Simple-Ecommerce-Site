import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'


function Header() {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    console.log(isOpen);
    

    const navItems = [
        {
            active: true,
            name: "Products",
            slug: "/products"
        },
        {
            active: true,
            name: "Cart",
            slug: "/cart"
        },
        {
            active: true,
            name: "AddProudct",
            slug: "add-product"
        }
    ]

    return (
        <nav className='flex justify-between items-center bg-slate-600 h-auto sm:h-15 p-4'>
            <div className='text-white font-semibold '>
                LOGO
            </div>
            {/*  Display in Desktop */}
            <ul className='sm:flex gap-4 items-center hidden'>
                {navItems.map((item) => (
                    item.active ? (
                        <li key={item.slug}>
                            <button onClick={() => navigate(item.slug)}
                                className='bg-white focus:outline-none'>
                                {item.name}
                            </button>
                        </li>
                    ) : null
                ))

                }
            </ul>
            <button  onClick={() => setIsOpen(!isOpen)}
            className='text-white block sm:hidden'>
                &#8801;
            </button>
            {isOpen &&
                <ul className=' fixed flex flex-col items-center p-4 top-0 bottom-0 
                right-0 left-32 bg-indigo-500 gap-6'>
                     <button  onClick={() => setIsOpen(!isOpen)}
            className='text-white absolute left-0 mr-2'>
                X
            </button>
                    {navItems.map((item) => (
                        item.active ? (
                            <li key={item.slug}>
                                <button onClick={() => navigate(item.slug)}
                                    className='bg-white focus:outline-none'>
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                    ))

                    }
                </ul>
            }

        </nav>
    )
}


export default Header
