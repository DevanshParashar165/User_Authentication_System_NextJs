"use client";
import axios from "axios";
import Link from "next/link";


export default function UserProfilePage({ params }: any) {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">Profile page</p>
      <span className="p-2 rounded-2xl bg-orange-400 text-black">{id}</span>
    </div>
  );
}
