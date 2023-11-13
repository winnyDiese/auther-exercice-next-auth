
import User from "@/app/(models)/User"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(){
    try {
        const body = await req.json()
        const userData = body.formData

        // Confirm data exist
        if(!userData?.name || !userData?.password){
            return NextResponse.json({message:"All fields are required."},{status:500})
        }

        // check duplicated emails
        const duplicated = await User.findOne({email:userData.email}).learn().exec()

        if(duplicated){
            return NextResponse.json({message:"Duplicated email !"},{status:409})
        }

        const hashPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashPassword

        await User.create(userData)
        return NextResponse.json({message:"User created.", error},{status:201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Error", error},{status:500})
    }
}
