import {
    NextRequest,
    NextResponse
} from 'next/server';
import {
    prisma
} from '@/lib/db'
import bcrypt from 'bcryptjs';
import { emailRegex,passwordRegex } from '@/lib/regex'
// resutful


export async function POST(request: NextRequest){
    // 容错处理 稳定为主
    try {
        const {
            email,
            password
        } = await request.json()

        // 邮箱验证
        if(!email || !emailRegex.test(email)){
            return NextResponse.json(
                { 
                    error: '邮箱格式无效' 
                }, {
                     status: 400 
                })
        }
        // 密码验证
        if (!password || !passwordRegex.test(password)) {
            return Response.json(
                { error: '密码需6-18位，且不能全为数字' },
                { status: 400 }
            )
        }

        // 检测用户名是否已注册
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(existingUser){
            return NextResponse.json({
                error: '用户已存在'
            },{
                status: 409
            })
        }

        // 密码的单向加密
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        })

        return NextResponse.json({
            message: 'Registration successful'
        },{
            status: 201
        })
    }catch (error){
        console.log(error)
        return NextResponse.json({
            message: 'Registration failed'
        },{
            status: 500
        })
    }finally{
        // 释放数据库对象
        await prisma.$disconnect()
    }
}