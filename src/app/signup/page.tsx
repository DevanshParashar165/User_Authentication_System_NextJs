"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function () {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled,setButtonDisabled] = useState(false)
    const [loading,setLoading] = useState(false)

    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup",user)
            console.log("Signup Succesfully : ",response.data)
            router.push("/login")
            setLoading(false)
        } catch (error:any) {
            console.log("Sign Up failed : ",error.message)
            toast.error(error.message)
        }finally{

        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing" : "Sign Up"}</h1>
            <hr />
            <label htmlFor="username">Username : </label>
            <input className="p-2 border-2 rounded-2xl" id="username" type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="Username....." />
            <label htmlFor="username">Email : </label>
            <input className="p-2 border-2 rounded-2xl" id="username" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email....." />
            <label htmlFor="username">Password : </label>
            <input className="p-2 border-2 rounded-2xl" id="username" type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password....." />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignUp}>{buttonDisabled ? "No Sign Up" : "Sign Up"}</button>
            <Link href='/login'>Visit Login</Link>
        </div>
    )
}