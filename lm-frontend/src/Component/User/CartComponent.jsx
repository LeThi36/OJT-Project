import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserById } from '../../Services/UserService';
import { useMutation } from 'react-query';
import { createBorrowRecordMultiple } from '../../Services/BorrowRecordService';

function CartComponent() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const userId = sessionStorage.getItem("userId");
    const [cartInfo, setCartInfo] = useState(cart.map((cartItem) => {
        return {
            ...cartItem,
            startDate: "",
            endDate: "",
            dateValid: true,
        }
    }));
    const navigate = useNavigate();
    const createBorrowRecordsMutate = useMutation({
        mutationFn: (borrowRecords) => {
            return createBorrowRecordMultiple(borrowRecords);
        },
        onSuccess: () => {
            localStorage.removeItem('cart');
            alert("Borrow requests registered. Awaiting approval.");
            navigate('/')
        },
        onError: () => {
            alert("Operation failed. Please try again.");
        }
    });

    const handleRemoveItem = (bookId) => {
        const cartItem = cart.filter((b) => bookId !== b.bookId)
        localStorage.setItem("cart", JSON.stringify(cartItem))
        window.location.reload()
    }

    function handleChangeStartDate(value, curIndex) {
        setCartInfo(cartInfo.map((item, index) => {
            if (index === curIndex)
            return {
                ...item,
                startDate: value,
            }
            return item;
        }));
    }

    function handleChangeEndDate(value, curIndex) {
        setCartInfo(cartInfo.map((item, index) => {
            if (index === curIndex)
            return {
                ...item,
                endDate: value,
            }
            return item;
        }));
    }

    function checkDateInterval(startDate, endDate) {
        const current = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (!start || !end) return false;
        if (current <= start && start < end) return true;
        return false;
    }

    function handleBorrowBooks() {
        let validDates = true;
        const newCartInfo = cartInfo.map((item) => {
            const valid = checkDateInterval(item.startDate, item.endDate);
            validDates &= valid;
            return {
                ...item,
                dateValid: valid,
            }
        });
        if (validDates) {
            const borrowRecordsBody = {
                userId,
                books: cartInfo.map((item) => {
                    const borrowDuration = (new Date(item.endDate) - new Date(item.startDate)) / (1000 * 3600 * 24);
                    return {
                        bookId: item.bookId,
                        borrowDate: item.startDate,
                        borrowDurationDays: borrowDuration
                    }
                })
            };
            createBorrowRecordsMutate.mutate(borrowRecordsBody);
        } else {
            setCartInfo(newCartInfo);
        }
    }

    if (cart.length === 0) {
        return (
            <>
                <div className=' h-[55vh] flex justify-center items-center'>
                    <Link to={'/books'}
                        className="rounded-full py-4 w-full max-w-[400px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                        <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">Cart is empty Continue Shopping</span>
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
                        <span className="w-full max-w-[200px] text-center">Borrow Date</span>
                        <span className="w-full max-w-[260px] text-center">Return Date</span>
                    </p>
                </div>

                {cartInfo.map((book, index) => {
                    return (
                        <div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                                <div
                                    className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                    <Link to={`/books/${book.bookId}`}>
                                        <div className="img-box"><img src={`https://drive.google.com/thumbnail?id=${book.imageUrl.split('id=')[1]}&sz=w140`} alt={book.title} className="xl:w-[140px]" /></div>
                                    </Link>
                                    <div className="pro-data w-full max-w-sm ">
                                        <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">{book.title}
                                        </h5>
                                        <p
                                            className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                                            {book.category}</p>
                                        <p
                                            className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                                            {book.author}</p>
                                        <button className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center" onClick={() => { handleRemoveItem(book.bookId) }}>remove item</button>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                                    <div className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                                        <input type='date' className='rounded' value={book.startDate} onChange={(e) => handleChangeStartDate(e.target.value, index)}></input>
                                        <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap"></span>
                                    </div>
                                    <div className="flex items-center w-full mx-auto justify-center">
                                    </div>
                                    <div className='font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center'>
                                        <input type='date' className='rounded' value={book.endDate} onChange={(e) => handleChangeEndDate(e.target.value, index)}></input>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: !book.dateValid ? 'block' : 'none', textAlign: 'center', color: 'red', fontSize: 18, transform: "translateY(-16px)" }}>
                                Please enter valid dates
                            </div>
                        </div>
                    )
                })}
                <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                    <div className="flex items-center justify-between w-full py-6">
                        <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Fine if not return in time</p>
                        <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">{50000 * cart.length} VND</h6>
                    </div>
                </div>
                <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                    <Link to={'/'}
                        className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                        <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">Continue Browsing</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" stroke-width="1.6"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Link>
                    <button
                        onClick={handleBorrowBooks}
                        className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
                        disabled={createBorrowRecordsMutate.isLoading}
                        >
                        {createBorrowRecordsMutate.isLoading ? "Processing..." : "Borrow these book"}
                        <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
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