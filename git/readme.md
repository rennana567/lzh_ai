# git

开源的分布式版本控制工具
- 代码的安全 新版本 push
- 代码的协作，共享 pull
- github gitee 等仓库中（main）

## repo
  - 仓库
  - create a repo 
# git 配置
- git config --global user.name "xxx" 用户名
- git config --global user.email "xxx" 邮箱

  git add 不是直接提交到仓库，而是先放入暂存区
  git commit -m "xxx" 提交到仓库
  git push 推送到远程仓库

  修改依旧git add 修改的文件
  git commit -m "xxx" 提交到仓库
  git push origin main推送到远程仓库
    - git push -u origin main 表示将本地的 main 分支推送到远程仓库 origin，并将 origin/main 设置为 main 分支的上游分支。
    - 之后，你可以直接使用 git push 或 git pull，而无需再指定远程分支
