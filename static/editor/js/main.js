function getCursorPosition(textarea) {
  var rangeData = {
    text: "",
    start: 0,
    end: 0
  };
  textarea.focus();
  textarea.setSelectionRange
  // if (textarea.setSelectionRange) { // W3C
  rangeData.start = textarea.selectionStart;
  rangeData.end = textarea.selectionEnd;
  rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
  // }
  return rangeData;
}

var bindTab = function() {
  $(".editor").on('keydown', function(e) {
    if (e.keyCode == 9) {
      e.preventDefault();
      var indent = '    ';
      var start = this.selectionStart;
      var end = this.selectionEnd;
      var selected = window.getSelection().toString();
      selected = indent + selected.replace(/\n/g, '\n' + indent);
      this.value = this.value.substring(0, start) + selected +
        this.value.substring(end);
      this.setSelectionRange(start + indent.length, start +
        selected.length);
    }
  })
}

var bindText = function() {
  $('.editor').on('keyup', function(e) {
    var converter = new showdown.Converter();
    var size = $('.editor').css('font-size')
    if (e.keyCode == 13) {
      var textarea = document.querySelector('.editor')
      var position = getCursorPosition(textarea)
      var value = $('.editor').val()
      var t1 = value.slice(0, position.start)
      var t2 = value.slice(position.start, value.length)
      value = t1 + '<br>' + t2
      var html = converter.makeHtml(value);
    } else {
      var value = $('.editor').val()
    }
    var html = converter.makeHtml(value);
    $('.rightbox').html(html);
    $('.rightbox').css('font-size', size)
  })
}

var bindScroll = function() {
  $('.editor').scroll(function() {
    var top = $('.editor').scrollTop()
    $('.rightbox').scrollTop(top)
  })
}

var bindSize = function() {
  var s = $('.glyphicon-text-size')
  var input = $('.fontsize')
  s.click(function() {
    var size = $('.editor').css('font-size').slice(0, 2)
    input.val(size)
    input.fadeToggle('slow')
  })
  input.on('input', function() {
    var value = input.val()
    $('.editor').css('font-size', value + 'px')
    $('.rightbox').css('font-size', value + 'px')
  })
}

var bindBold = function() {
  var bold = $('.glyphicon-bold')
  bold.click(function() {
    var textarea = document.querySelector('.editor')
    var position = getCursorPosition(textarea)
    var converter = new showdown.Converter();
    var value = $('.editor').val()
    if (position.start === position.end) {
      var t1 = value.slice(0, position.end)
      var t2 = value.slice(position.end, position.length)
      value = t1 + '**粗体文本**' + t2
    } else {
      var t1 = value.slice(0, position.start)
      var t2 = value.slice(position.start, position.end)
      var t3 = value.slice(position.end, position.length)
      value = t1 + ' **' + t2 + '** ' + t3
    }
    $('.editor').val(value)
    var html = converter.makeHtml(value);
    $('.rightbox').html(html);
  })
}

var bindItalic = function() {
  var italic = $('.glyphicon-italic')
  italic.click(function() {
    var textarea = document.querySelector('.editor')
    var position = getCursorPosition(textarea)
    var converter = new showdown.Converter();
    var value = $('.editor').val()
    if (position.start === position.end) {
      var t1 = value.slice(0, position.end)
      var t2 = value.slice(position.end, position.length)
      value = t1 + '*斜体文本*' + t2
    } else {
      var t1 = value.slice(0, position.start)
      var t2 = value.slice(position.start, position.end)
      var t3 = value.slice(position.end, position.length)
      value = t1 + ' *' + t2 + '* ' + t3
    }
    $('.editor').val(value)
    var html = converter.makeHtml(value);
    $('.rightbox').html(html);
  })
}

var bindOl = function() {
  var ol = $('.glyphicon-sort-by-order')
  ol.click(function() {
    var textarea = document.querySelector('.editor')
    var position = getCursorPosition(textarea)
    var converter = new showdown.Converter();
    var value = $('.editor').val()
    if (position.start === position.end) {
      var t1 = value.slice(0, position.end)
      var t2 = value.slice(position.end, position.length)
      value = t1 + '\n\n 1. 列表项\n\n' + t2
    } else {
      var t1 = value.slice(0, position.start)
      var t2 = value.slice(position.start, position.end)
      var t3 = value.slice(position.end, position.length)
      value = t1 + '\n\n 1. ' + t2 + '\n\n' + t3
    }
    $('.editor').val(value)
    var html = converter.makeHtml(value);
    $('.rightbox').html(html);
  })
}

var bindUl = function() {
  var ul = $('.glyphicon-list')
  ul.click(function() {
    var textarea = document.querySelector('.editor')
    var position = getCursorPosition(textarea)
    var converter = new showdown.Converter();
    var value = $('.editor').val()
    if (position.start === position.end) {
      var t1 = value.slice(0, position.end)
      var t2 = value.slice(position.end, position.length)
      value = t1 + '\n\n - 列表项\n\n' + t2
    } else {
      var t1 = value.slice(0, position.start)
      var t2 = value.slice(position.start, position.end)
      var t3 = value.slice(position.end, position.length)
      value = t1 + '\n\n - ' + t2 + '\n\n' + t3
    }
    $('.editor').val(value)
    var html = converter.makeHtml(value);
    $('.rightbox').html(html);
  })
}
var bindHead = function() {
  var head = $('.glyphicon-header')
  head.click(function() {
    var textarea = document.querySelector('.editor')
    var position = getCursorPosition(textarea)
    var converter = new showdown.Converter();
    var value = $('.editor').val()
    var t1 = value.slice(0, position.start)
    var t2 = value.slice(position.start, position.end)
    var t3 = value.slice(position.end, position.length)
    if (position.start === position.end) {
      value = t1 + '## 标题 ##' + t3
    } else {
      value = t1 + '\n\n' + t2 + '\n=====\n\n' + t3
    }
    $('.editor').val(value)
    var html = converter.makeHtml(value);
    $('.rightbox').html(html);
  })
}

var bindLine = function() {
  var line = $('.glyphicon-minus')
  line.click(function() {
    var textarea = document.querySelector('.editor')
    var position = getCursorPosition(textarea)
    var converter = new showdown.Converter();
    var value = $('.editor').val()
    var t1 = value.slice(0, position.end)
    var t2 = value.slice(position.end, position.length)
    value = t1 + '\n\n-----\n\n' + t2
    $('.editor').val(value)
    var html = converter.makeHtml(value);
    $('.rightbox').html(html);
  })
}

var bindTheme = function() {
  var theme = $('.glyphicon-adjust')
  theme.click(function() {
    $('.editor').toggleClass('dark')
    $('.rightbox').toggleClass('dark')
    $('.leftbox').toggleClass('dark')
    $('.container').toggleClass('dark')
  })
}


var main = function() {
  bindTab()
  bindText()
  bindScroll()
  bindSize()
  bindBold()
  bindItalic()
  bindOl()
  bindUl()
  bindHead()
  bindLine()
  bindTheme()
  $('.editor').ready(function() {
    text = `#本文引用自[Cmd Markdown ](https://www.zybuluo.com/mdeditor)仅作为测试用
#侵删联系作者：244039784@qq.com

-----

## 欢迎使用 Cmd Markdown 编辑阅读器

------

我们理解您需要更便捷更高效的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，**Cmd Markdown** 是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：

> * 整理知识，学习笔记
> * 发布日记，杂文，所见所想
> * 撰写发布技术文稿（代码支持）
> * 撰写发布学术论文（LaTeX 公式支持）

![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)

除了您现在看到的这个 Cmd Markdown 在线版本，您还可以前往以下网址下载：

### [Windows/Mac/Linux 全平台客户端](https://www.zybuluo.com/cmd/)

> 请保留此份 Cmd Markdown 的欢迎稿兼使用说明，如需撰写新稿件，点击顶部工具栏右侧的 <i class="icon-file"></i> **新文稿** 或者使用快捷键 'Ctrl+Alt+N'。

------

## 什么是 Markdown

Markdown 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体** 或者 *斜体* 某些文字，更棒的是，它还可以

### 1. 制作一份待办事宜 [Todo 列表](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown#13-待办事宜-todo-列表)

- [ ] 支持以 PDF 格式导出文稿
- [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
- [x] 新增 Todo 列表功能
- [x] 修复 LaTex 公式渲染问题
- [x] 新增 LaTex 公式编号功能`
    $('.editor').val(text)
    var converter = new showdown.Converter()
    var size = $('.editor').css('font-size')
    var html = converter.makeHtml(text)
    $('.rightbox').html(html)
    $('.rightbox').css('font-size', size)
  })
}

main()
