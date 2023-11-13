import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

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
        })
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
