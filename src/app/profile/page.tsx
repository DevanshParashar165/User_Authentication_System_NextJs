"use client"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();

    const [data,setData] = useState("nothing")

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/current-user')
        console.log(res.data)
        setData(res.data.user._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-3 rounded-2xl bg-green-400">{data === "nothing" ?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button
                className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 rounded"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
            <button
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 rounded"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    )
}