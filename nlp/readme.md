# 机器学习

- notebookllm
  你不知道的JavaScript 深入学习
  AI 播客

- modelscope
 阿里开源大模型社区
- python
  ipynb 后缀
  nlp 机器学习

- python
  nlp 第一语言
  js 也挺好的

- 引入了pipleline 模块
model 中国第一大模型社区
  from modelscope
  魔搭
  from modelscope.pipelines import pipeline
  from modelscope.utils.constant import Tasks

  semantic_cls = pipeline(Tasks.text_classification,'damo/nlp_structbert_sentiment-classification_chinese-base')
  打分 label 分类
  result = semantic_cls(input='今天天气不错')