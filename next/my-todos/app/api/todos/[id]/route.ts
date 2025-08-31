import { NextResponse } from 'next/server'
import {
    PrismaClient
} from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request:Request,{params}:{params:{id:string}}){
    const {
        completed
    } = await request.json()
    const todo = await prisma.todo.update({
        where: { id: Number(params.id) },
        data: {
            completed
        }
    })
    return NextResponse.json(todo)
}

export async function DELETE(req: Request,{params}:{params:{id:string}}){
    const todo = await prisma.todo.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json({
        success: true
    })
}