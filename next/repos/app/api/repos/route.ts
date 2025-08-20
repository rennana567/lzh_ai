import {
    NextResponse,
} from 'next/server'

export async function GET(){
    try {
        const response = await fetch('https://api.github.com/users/rennana567/repos')
        const repos = await response.json()
        return NextResponse.json(repos)
    } catch(error) {
        return NextResponse.json({error:'获取失败'
    },{
        status:500
    })
  }
}