"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function () {
    const router = useRouter()
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login",user)
            console.log("Login Succesfully : ",response.data)
            router.push("/profile")
        } catch (error:any) {
            console.log("Sign Up failed : ",error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length>0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing" : "Log In"}</h1>
            <hr />
            <label htmlFor="username">Email : </label>
            <input className="p-2 border-2 rounded-2xl" id="username" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email....." />
            <label htmlFor="username">Password : </label>
            <input className="p-2 border-2 rounded-2xl" id="username" type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="password....." />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}>Login</button>
            <Link href='/signup'>Visit signUp</Link>
        </div>
    )
}