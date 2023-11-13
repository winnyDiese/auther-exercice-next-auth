
import { WithAuth, withAuth } from "next-auth/middleware";  
import { NextResponse } from "next/server";

// export {default} from "next-auth/middleware"
export default withAuth(
    function middleware(req){
        console.log(req.nextUrl.pathname)
        console.log(req.nextauth.token.role)

        if(req.nextUrl.pathname.startWith("/CreateUser") && req.nextauth.token.role != ""){
            return NextResponse.rewrite(new URL("/Denied", req.url))
        }
    },{
        callbacks:{
            authorized: ({token}) => !!token
        }
    }
)
export const config = {mathcer: ["/CreateUser"]}