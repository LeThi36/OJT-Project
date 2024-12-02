import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUserById } from '../../Services/UserService';

function CartComponent() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        getUserById(userId)
        .then((response) => response.data)
        .then((data) => console.log(data))
    })

    if (cart.length === 0) {
        return (
            <>
                <div className=' h-[55vh] flex justify-center items-center'>
                    <Link to={'/books'}
                        class="rounded-full py-4 w-full max-w-[400px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                        <span class="px-2 font-semibold text-lg leading-8 text-indigo-600">Cart is empty Continue Shopping</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" stroke-width="1.6"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Link>
                </div>

            </>


        )
    }

    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

                <div className="w-full max-w-7xl flex justify-between items-center">
                    <h2 className="title font-manrope font-bold text-4xl leading-10 text-black">
                        Book Cart
                    </h2>
                    <h2 className="title font-manrope font-bold text-4xl leading-10 text-black">
                        {cart.length} Book
                    </h2>
                </div>


                <div className="hidden lg:grid grid-cols-2 py-6">
                    <div className="font-normal text-xl leading-8 text-gray-500">Book</div>
                    <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                        <span className="w-full max-w-[200px] text-center">Return Date</span>
                        <span className="w-full max-w-[260px] text-center">Due Date</span>
                    </p>
                </div>

                {cart.map((book) => {
                    return (
                        <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                            <div
                                className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                <div className="img-box"><img src='https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg' alt={book.title} className="xl:w-[140px]" /></div>
                                <div className="pro-data w-full max-w-sm ">
                                    <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">{book.title}
                                    </h5>
                                    <p
                                        className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                                        {book.category}</p>
                                    <p
                                        className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                                        {book.author}</p>
                                    <button className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center" >remove item</button>
                                </div>
                            </div>
                            <div
                                className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                                <div className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                                    <input type='date' className='rounded'></input>
                                    <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap"></span>
                                </div>
                                <div className="flex items-center w-full mx-auto justify-center">
                                </div>
                                <div className='font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center'>
                                    <input type='date' className='rounded'></input>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div class="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                    <div class="flex items-center justify-between w-full py-6">
                        <p class="font-manrope font-medium text-2xl leading-9 text-gray-900">Fine if not return in time</p>
                        <h6 class="font-manrope font-medium text-2xl leading-9 text-indigo-500">1000$</h6>
                    </div>
                </div>
                <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                    <Link to={'/'}
                        class="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                        <span class="px-2 font-semibold text-lg leading-8 text-indigo-600">Continue Shopping</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" stroke-width="1.6"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Link>
                    <button
                        class="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">Continue
                        to Payment
                        <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                            fill="none">
                            <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" stroke-width="1.6"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CartComponent