import React from 'react'
import CategoryComponent from './CategoryComponent'
import StarCardComponent from './StarCardComponent'


function LandingpageComoponent() {
    return (
        <>
            <div className='grid grid-cols-2'>
                <div className='flex flex-col ms-24'>
                    <h1 className='mt-auto text-8xl font-mono font-semibold text-indigo-700'>Library Management</h1>
                    <p className='mt-10 text-justify text-xl'>Our library management system offers a comprehensive solution to help you track, organize, and manage books and users effectively. From borrowing and returning books to reservations, catalog management, and user information, everything is seamlessly handled on a user-friendly platform. Join us to enhance your reading experience and streamline your library management today!</p>
                    <a href='/login' className='mb-auto max-w-32 border-2 rounded-full py-2 px-3 mt-10 uppercase bg-orange-500 text-white hover:bg-orange-700 duration-300 shadow-md shadow-gray-500 border-orange-500 hover:border-orange-700'>Join us now</a>
                </div>
                <img className='' src='https://img.freepik.com/free-vector/library-concept-illustration_114360-2673.jpg?t=st=1733570497~exp=1733574097~hmac=de40256be271561d744498ae6ad1e3e8b9b80ae2188e07be81558d04318a8339&w=1000'></img>
            </div>
            <CategoryComponent />
            <StarCardComponent />
        </>
    )
}

export default LandingpageComoponent