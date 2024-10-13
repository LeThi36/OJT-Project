import React from 'react'
import SidebarComopnent from './SidebarComopnent'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserTableComponent from './UserTableComponent'
import UserProfileComponent from './UserProfileComponent'
import { isAdminUser, isUserLoggedIn } from '../../Services/AuthService'

function AdminComopnent() {
    function AuthenticatedRoute({ children }) {

        const isAuth = isUserLoggedIn();

        if (isAuth && isAdminUser()) {
            return children;
        }

        return <Navigate to="/login" />

    }
    return (
        <>
            <AuthenticatedRoute>
                <SidebarComopnent />
                <div className="ml-80 py-2 w-auto mt-6 mr-16">
                    <Routes>
                        <Route path="user" element={<UserTableComponent />} />
                        <Route path='user/:id' element={<UserProfileComponent />} />
                    </Routes>
                </div>
            </AuthenticatedRoute>
        </>
    )
}

export default AdminComopnent