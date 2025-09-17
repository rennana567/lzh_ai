import {
  supabase
} from'./lib/supabaseClient.mjs'
// Backend as service
// 异步， node
const {error} = await supabase.from("todos").insert({
    title: "从0-1 开发一个AI应用",
    iscomplete: false,
})
console.log(error)

// const {data, error} = await supabase.from("todos").select("*")
// console.log(data)
