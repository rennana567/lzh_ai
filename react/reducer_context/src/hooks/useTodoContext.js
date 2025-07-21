import { TodoContext } from "../TodoContext";
import { useContext } from "react";

/**
 * 自定义hook
 */
export function useTodoContext(){
  return useContext(TodoContext)
}