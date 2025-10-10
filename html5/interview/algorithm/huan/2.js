const hasCycle = function(head) {
    while(head){
        if(head.flag){
            return true;
        }else {
            head.flag = true;
            head = head.next;
        }
    }
    return false;
}