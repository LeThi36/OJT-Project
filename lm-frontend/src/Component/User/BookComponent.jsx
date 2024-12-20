import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { json, useNavigate, useParams } from 'react-router-dom';
import { getBookById } from '../../Services/BookService';
import { countBookReviewById, deleteBookReviewById, getBookReviewByBookId, postBookReview } from '../../Services/BookReview';
import { createBorrowRecord } from '../../Services/BorrowRecordService';
import { isUserLoggedIn } from '../../Services/AuthService';

function BookComponent() {
    const { id } = useParams()

    const navigate = useNavigate()

    const [reviewRequest, setReviewRequest] = useState({
        bookId: id,
        userId: sessionStorage.getItem('userId'),
        rating: 1,
        reviewText: '',
    })
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [favorited, setFavorited] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [borrowStart, setBorrowStart] = useState('');
    const [borrowEnd, setBorrowEnd] = useState('');
    const [isValidDate, setIsValidDate] = useState(true);
    const [isConfirm, setIsConfirm] = useState(false)
    const [bookReviewId, setBookReviewId] = useState(null)
    const userId = sessionStorage.getItem("userId");

    function checkValidDate() {
        const currentDate = new Date();
        const borrowStartDate = new Date(borrowStart);
        const borrowEndDate = new Date(borrowEnd);
        if (currentDate <= borrowStartDate && borrowStartDate <= borrowEndDate) return true;
        return false;
    }

    const borrowMutation = useMutation({
        mutationFn: (borrowRecord) => {
            return createBorrowRecord(borrowRecord);
        },
        onSuccess: () => {
            setBorrowEnd("");
            setBorrowStart("");
            setShowModal(false);
            alert("Borrow request registered. Awaiting approval.");
        },
        onError: () => {
            alert("Operation failed. Please try again.");
        }
    });

    function onBorrow() {
        if (!checkValidDate()) setIsValidDate(false);
        else {
            setIsValidDate(true);
            const borrowStartDate = new Date(borrowStart);
            const borrowEndDate = new Date(borrowEnd);
            const duration = (borrowEndDate - borrowStartDate) / (1000 * 3600 * 24);
            borrowMutation.mutate({
                userId: Number(userId),
                bookId: id,
                borrowDate: borrowStartDate,
                borrowDurationDays: duration
            });
        }
    }

    useEffect(() => {
        countBookReviewById(id).then(res => { const count = res.data; setTotalPage(Math.ceil(count / 4)) }
        )
        const favoriteBook = JSON.parse(localStorage.getItem('favoriteBook')) || [];
        const existed = favoriteBook.find(item => item.bookId == id);
        setFavorited(existed ? true : false);
    }, [])


    const { data: book, isLoading: loadingBook } = useQuery({
        queryFn: () => getBookById(id).then(response => response.data),
        queryKey: ["book", id]
    })
    const { data: review, isLoading: loadingReview, refetch } = useQuery({
        queryFn: () => getBookReviewByBookId(id, currentPage, 4).then(response => response.data),
        queryKey: ["review", id, currentPage]
    })

    if (loadingBook) {
        return <div>Book Loading...</div>;
    }
    if (loadingReview) {
        return <div>Review Loading...</div>;
    }


    const rating = () => {
        if (review.length === 0) return 0;
        const sum = review.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
        return Math.round(sum / review.length);
    }

    const handelLikeBook = (book) => {
        const favoriteBook = JSON.parse(localStorage.getItem('favoriteBook')) || [];
        const existed = favoriteBook.find(item => item.bookId === book.bookId);
        if (existed) {
            const modifiedFavoriteBook = favoriteBook.filter((bookItem) => bookItem.bookId !== book.bookId);
            localStorage.setItem('favoriteBook', JSON.stringify(modifiedFavoriteBook));
            setFavorited(false);
            alert('Book removed to favorite');
        } else {
            favoriteBook.push(book);
            localStorage.setItem('favoriteBook', JSON.stringify(favoriteBook));
            setFavorited(true);
            alert('Book added to favorite');
        }
    }

    const handelCart = (book, redirect) => {

        if (isUserLoggedIn()) {
            const cart = JSON.parse(localStorage.getItem('cart')) || []
            const existed = cart.find(item => item.bookId === book.bookId)
            if (existed) {
                cart.map(item => {
                    if (item.bookId === book.bookId)
                        return alert('book already add')
                    return item
                })
            } else {
                localStorage.setItem('cart', JSON.stringify([...cart, { ...book }]))
                alert('Book added to cart')
            }
            if (redirect) {
                navigate('/cart')
            }
        } else {
            navigate('/login')
        }
    }

    const url = book.imageUrl.split('id=')[1]


    const handleSubmitReview = (e) => {
        e.preventDefault()
        postBookReview(reviewRequest).then(res => {
            setReviewRequest({
                ...reviewRequest,
                reviewText: '',
            }
            )
                ; refetch()
        }).catch(err => alert(err))
    }

    const handleConfirm = () => {
        setIsConfirm(!isConfirm)
        setBookReviewId(null)
        deleteBookReviewById(bookReviewId).then(res => alert(res.data)).catch(err => alert(err))
        refetch()
    }

    const handleDeleteButton = (r) => {
        setIsConfirm(!isConfirm)
        setBookReviewId(r.reviewId)
    }

    const handleBorrowButton = () => {
        isUserLoggedIn() ? setShowModal(true) : navigate('/login')
    }


    return (
        <>
            {borrowMutation.isLoading && (
                <div style={{ textAlign: 'center', width: "100vw", height: "100vh", position: 'fixed', top: 0, left: 0, zIndex: 10000, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    <img style={{ marginTop: "20%", marginLeft: "50%", transform: "translateX(-50%)" }} src="https://media.tenor.com/_62bXB8gnzoAAAAj/loading.gif" alt="" />
                </div>
            )}
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt={book.title} className="lg:w-1/2 w-full lg:h-auto max-h-[600px] h-64 object-contain object-center rounded" src={`https://drive.google.com/thumbnail?id=${url}&sz=w1000`} />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">{book.category}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{book.title}</h1>
                            <div className="flex mb-4">
                                <button className="flex items-center">
                                    {Array(5).fill(0).map((_, index) => (
                                        <svg
                                            key={index}
                                            fill={index < Math.floor(rating()) ? "currentColor" : "none"}
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-indigo-500"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    ))}
                                    <span className="text-gray-600 ml-3">{review.length} reviews</span>
                                </button>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="font-medium">author: {book.author}</p>
                            <p className="font-medium">publisher: {book.publisher}</p>
                            <p className="font-medium">status: {book.status}</p>
                            <p className="leading-relaxed">{book.description}</p>
                            <div className="flex justify-between item-center mt-20">
                                <div className="flex">
                                    <button
                                        onClick={() => handleBorrowButton()}
                                        className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded mr-2 duration-300"
                                    >Borrow it now</button>
                                    <button className="flex ml-auto border border-indigo-500  py-2 px-6 focus:outline-none hover:bg-indigo-500 hover:text-white rounded duration-300" onClick={() => handelCart(book)}>Add to cart</button>
                                </div>

                                <button onClick={() => handelLikeBook(book)} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    {favorited ? (<svg fill="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                    </svg>)
                                        : (<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='container mx-auto'>
                <h1 className="font-bold text-center text-3xl ">Reviews</h1>
                <div className="w-3/4 bg-white p-2 my-4 mx-auto">
                    <div>
                        {
                            review.map(r => {
                                return (
                                    <div className="flex flex-col" key={r.reviewId}>
                                        <div className="border rounded-md p-3 ml-3 my-3">
                                            <div className="flex gap-3 items-center">
                                                <img src={`https://drive.google.com/thumbnail?id=${r.user.imageUrl.split('id=')[1]}`}
                                                    className="object-cover w-8 h-8 rounded-full
                            border-2 border-emerald-400  shadow-emerald-400
                            "/>
                                                <h3 className="font-bold">
                                                    {
                                                        r.user.username
                                                    }
                                                </h3>
                                                {Array(5).fill(0).map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        fill={index < Math.floor(r.rating) ? "currentColor" : "none"}
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        className="w-4 h-4 text-indigo-500"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                    </svg>
                                                ))}
                                                {
                                                    userId == r.user.userId ? (<button className='text-white ms-auto me-2 border rounded-full px-2 hover:bg-red-800 bg-red-600 duration-300' onClick={() => handleDeleteButton(r)}>Delete this review</button>) : (<></>)
                                                }
                                            </div>
                                            <p className="text-gray-600 mt-2">
                                                {
                                                    r.reviewText
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex justify-center mt-4">
                        {Array(totalPage).fill(0).map((page, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`mx-1 px-4 py-2 ${currentPage === index ? 'bg-indigo-700 hover:bg-indigo-500' : 'bg-indigo-500'} text-white rounded hover:bg-indigo-300 duration-300`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    {
                        isUserLoggedIn() &&
                        <div className='flex flex-col'>
                            <div className="border rounded-md p-3 ml-3 my-3">
                                <div className='flex p-2 mb-2'>
                                    <p className='font-bold me-2 my-auto'>Write your review</p>
                                    <p className='my-auto'>rating: </p>
                                    <select onChange={(e) => setReviewRequest({ ...reviewRequest, rating: e.target.value })} className='text-xs ms-2 rounded-md border-inherit'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <input onChange={(e) => setReviewRequest({ ...reviewRequest, reviewText: e.target.value })} type='text' className='w-full border-inherit rounded-md' placeholder='write your review here' value={reviewRequest.reviewText} />
                                <button onClick={(e) => handleSubmitReview(e)} className='border rounded-md mt-2 p-2 bg-indigo-500 text-white hover:bg-indigo-800 duration-300'>submit</button>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className={`${!isConfirm ? 'hidden overflow-y-hidden' : 'block overflow-y-hidden'} fixed inset-0 bg-slate-400 bg-opacity-60 overflow-y-auto h-fullfull w-auto px-4`}>
                <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

                    <div className="flex justify-end p-2">
                        <button type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => setIsConfirm(false)}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-6 pt-0 text-center">
                        <svg className="w-20 h-20 text-indigo-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this review?</h3>
                        <button onClick={() => handleConfirm()}
                            className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </button>
                        <button onClick={() => setIsConfirm(!isConfirm)}
                            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                            data-modal-toggle="delete-user-modal">
                            No, cancel
                        </button>
                    </div>
                </div>
            </div>

            <div
                id='borrow-book-modal'
                style={{
                    display: showModal ? "block" : "none",
                    position: 'fixed', backgroundColor: "rgba(0,0,0,0.1)", width: "100%", height: "100%", top: 0, zIndex: 9999,
                    padding: "140px 20%"
                }}
            >
                <div
                    style={{ height: 450, width: "100%", backgroundColor: 'white', borderRadius: 20, position: 'relative' }}
                >
                    <div
                        style={{ position: 'absolute', right: 30, top: 20, color: "#6B7280", fontWeight: 700, cursor: "pointer" }}
                        onClick={() => setShowModal(false)}
                    >✕</div>
                    <div
                        style={{ borderBottom: "1px solid #ccc", fontSize: 32, textAlign: 'center', padding: "8px 0", fontWeight: 700 }}
                    >Borrow Info</div>

                    {/* modal body */}
                    <div style={{ padding: 16 }}>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 500, textAlign: 'center', marginTop: 80 }}>Please enter borrow time:</div>
                            <div
                                style={{ color: 'red', textAlign: 'center', display: isValidDate ? 'none' : 'block' }}
                            >Please enter valid date</div>
                            <div style={{ display: "flex", alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>
                                <div>
                                    <div>Start date:</div>
                                    <input type='date' value={borrowStart} onChange={(e) => setBorrowStart(e.target.value)} />
                                </div>
                                <div style={{ marginLeft: 20 }}>
                                    <div>End date:</div>
                                    <input type='date' value={borrowEnd} onChange={(e) => setBorrowEnd(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: 'flex-end', padding: 16, position: 'absolute', bottom: '0', right: "0" }}>
                        <button
                            className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mr-2"
                            onClick={() => onBorrow()}
                        >Borrow</button>
                        <button
                            onClick={() => setShowModal(false)}
                            className="flex border border-indigo-500  py-2 px-6 focus:outline-none hover:bg-indigo-600 hover:text-white rounded"
                        >Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookComponent