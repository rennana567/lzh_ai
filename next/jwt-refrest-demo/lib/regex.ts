// 匹配规则，符号数学
// .  什么都匹配，匹配一个
// +  一次或多次
// @  email 必备字符
// .+@  在@前面至少要有一个字符
// \.  一定要有一个 . 
export const emailRegex = /^.+@.+\..+$/; // RegExp
export const passwordRegex = /^(?!^\d+$)^[a-zA-Z0-9!@#$%^&*\.]{6,18}$/