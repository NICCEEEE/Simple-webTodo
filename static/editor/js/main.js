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

var bindItalic = function(){
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

var bindOl = function(){
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

var bindUl = function(){
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
var bindHead = function(){
  var head = $('.glyphicon-header')
  head.click(function(){
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

var bindLine = function(){
  var line = $('.glyphicon-minus')
  line.click(function(){
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

var bindTheme = function(){
  var theme = $('.glyphicon-adjust')
  theme.click(function(){
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
}

main()
