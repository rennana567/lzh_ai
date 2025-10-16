class TaskScheduler {
    constructor(maxConcurrency = 2){
        this.maxConcurrency = maxConcurrency
        this.runningCount = 0 // 正在执行的任务数量
        this.taskQueue = [] // FIFO
    }
    addTask(task){
        return new Promise((resolve, reject) => {
            const run = () => {
                this.runningCount++
                task()
                  .then(resolve)
                  .catch(reject)
                  .finally(() => {
                    this.runningCount--
                    this.schedule()
                  })
            }
            this.taskQueue.push(run)
            this.schedule()
        })
    }

    schedule(){
        while(this.runningCount < this.maxConcurrency && this.taskQueue.length > 0){
            const task = this.taskQueue.shift()
            task()
        }
    }
}

const task1 = () => new Promise(resolve => 
    setTimeout(() => {
        console.log('任务1完成')
        resolve(1)
    }, 1000)
)

const task2 = () => new Promise(resolve => 
    setTimeout(() => {
        console.log('任务2完成')
        resolve(2)
    }, 2000)
)

const task3 = () => new Promise(resolve => 
    setTimeout(() => {
        console.log('任务3完成')
        resolve(3)
    }, 1000)
)

const task4 = () => new Promise(resolve => 
    setTimeout(() => {
        console.log('任务4完成')
        resolve(4)
    }, 1000)
)

const scheduler = new TaskScheduler()
scheduler.addTask(task1)
scheduler.addTask(task2)
scheduler.addTask(task3)
scheduler.addTask(task4)