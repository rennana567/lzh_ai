// 全局任务对象，一个要处理的任务单元（fiber 节点）
let nextUnitOfWork = null;

function preformUnitOfWork(fiber){
    // 当前fiber 对应的真实DOM，没有就创建
    if(!fiber.dom){
        fiber.dom = createDom(fiber);
    }

    const elements = fiber.props.children;
    let index = 0;
    let preSibling = null;
    while(index < elements.length){
        const element = elements[index];
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        }
        if(index === 0){
            fiber.child = newFiber;
        }else {
            preSibling.sibling = newFiber;
        }
        preSibling = newFiber;
        index++;
    }
    
    if(fiber.child){
        return fiber.child;
    }
    // 如果没有子节点，找兄弟节点
    let nextFiber = fiber;
    while(next){
        if(nextFiber.sibling){
            return nextFiber.sibling;
        }
        next = nextFiber.parent;
    }

    return null;
}

function workLoop(deadline) { 
    let shouldYield = false;
    while(nextUnitOfWork && !shouldYield){
        nextUnitOfWork = preformUnitOfWork(nextUnitOfWork);
        // 指针的操作
        shouldYield = deadline.timeRemaining() < 1;
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)