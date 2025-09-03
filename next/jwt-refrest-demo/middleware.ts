import {
    NextResponse,
    NextRequest
} from 'next/server'

const protectedPath = ['/dashboard', '/profile']

export async function middleware(request: NextRequest){
    // pre    next
    const path = request.nextUrl.pathname
    // console.log(path)
    // console.log("你好")
    // 非保护的
    if(!protectedPath.some(p => path.startsWith(p))){
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.url))
}