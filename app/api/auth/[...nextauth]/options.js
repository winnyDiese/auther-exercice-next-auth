import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/app/(models)/User"
import bcrypt from "bcrypt"

export const options = {
    providers:[
        GithubProvider({
            profile(profile){
                console.log("Profil Github: ", profile)
                
                let userRole = "Github User"
                if(profile?.email == "jake@claritycoders.com"){
                    userRole = "admin"
                } 

                return {
                    ...profile,
                    role:userRole
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_Secret
        }),
        GoogleProvider({
            profile(profile){
                console.log("Profil Github: ", profile)

                let userRole = "Google User"
                return {
                    ...profile,
                    id:profile.sub,
                    role:userRole
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_Secret
        }),
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email: {
                    label:"email",
                    type:"text",
                    placeholder:"Your email"
                },
                password:{
                    label:"password",
                    type:"password",
                    placeholder:"your password"
                }
            },
            async authorize(credentials){
                try {
                    const founderUser = await User.findOne({email:credentials.email}).lean().exec()

                    if(founderUser){
                        console.log("User exist")
                        const match = await bcrypt.compare(
                            credentials.password,
                            founderUser.password
                        )
                    }

                    if(match){
                        console.log("Good Pass")
                        delete founderUser.password

                        founderUser["role"] = "Unverifield Email"
                        return founderUser
                    }
                } catch (error) {
                    console.log(error)
                }

                return null
            }
        }),
    ],
    callbacks:{
        async jwt({token, user}){
            if(user) token.role = user.role
        },
        async session({session,token}){
            if(session?.user) session.user.role = token.role
            return session
        }
    }
}
