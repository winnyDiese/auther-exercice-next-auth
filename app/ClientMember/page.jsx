'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Member = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated(){
            redirect("/api/auth/signin?callbackUrl=/clientMember")
        }
    })
    return (
        <div>
            <h1>Member client session</h1>
        </div>
    );
}

export default Member;
