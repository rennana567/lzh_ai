import {
    NextRequest,
    NextResponse
} from 'next/server'
import {
    prisma
} from '@/lib/db'
import { emailRegex, passwordRegex } from '@/lib/regex'
import bcrypt from 'bcryptjs'
import {
    createTokens,
    setAuthCookies
} from '@/lib/jwt'

export async function POST(request: NextRequest){
    try {
        const {
            email,
            password
        } = await request.json()

        if(!email || !emailRegex.test(email)){
            return NextResponse.json(
                { 
                    error: '邮箱格式无效' 
                }, {
                     status: 400 
                })
        }

        if (!password || !passwordRegex.test(password)) {
            return Response.json(
                { error: '密码需6-18位，且不能全为数字' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!user){
            return NextResponse.json({
                error: '用户不存在'
            },{
                status: 401
            })
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            return NextResponse.json({
                error: '密码错误'
            },{
                status: 401
            })
        }
        const {accessToken,refreshToken} = await createTokens(user.id)
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken
            }
        })

        setAuthCookies(accessToken, refreshToken)

        return NextResponse.json({
            message: '登录成功'
        })
    } catch(error){
        console.log(error)
        return NextResponse.json({
            error: '登录失败'
        },{
            status: 500
        })
    } finally{
        // 释放数据库对象
        await prisma.$disconnect()
    }
}