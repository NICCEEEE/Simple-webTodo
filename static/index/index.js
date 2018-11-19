// 函数节流
var throllte = function(fn, delay) {
  var prev = new Date()
  return function() {
    var current = new Date()
    if (current - prev > delay) {
      fn()
      prev = current
    }
  }
}

// 绑定滚动事件
// var bindScroll = function() {
//   $(window).scroll(function() {
//     var before = $(window).scrollTop()
//     var d = $(window).scroll(throllte(function() {
//       var after = $(window).scrollTop()
//       // 判断滚动方向
//       if (before < after) {
//         var direction = 'down'
//         checkDirection(direction)
//         before = after
//       }
//       if (before > after) {
//         var direction = 'up'
//         checkDirection(direction)
//         before = after
//       }
//       console.log(direction);
//     }, 1000))
//   })
// }

var bindScroll = function() {
  $(window).scroll(throllte((function() {
    var before = $(window).scrollTop()
    return function() {
      var after = $(window).scrollTop()
      if (before < after) {
        var direction = 'down'
        checkDirection(direction)
        before = after
      }
      if (before > after) {
        var direction = 'up'
        checkDirection(direction)
        before = after
      }
      console.log(direction);
    }
  })(), 150))
}
// 绑定向下滚动时小圆点的响应动作
// down 1: 0 ~ 610  2:610~1482  3: 1482~2354   4: 2354~3226  5: 3226~ 3488
var checkScrollDown = function(top) {
  // 设置下一张背景图为当前活动背景图时其必须覆盖的长度
  var offset = 872 * 0.7
  // 判断当前背景图的索引
  var index = Math.floor((top - offset) / 872) + 1
  var pagelinks = $('.pagelink')
  var links = $('.links')
  if (top < offset) {
    // 如果滚动条下滑的长度小于初始设定的覆盖长度，设定当前活动的背景图为第一张
    index = 0
    links.find('.active').removeClass('active')
    pagelinks.eq(index).addClass('active')
    bindFooter(index)
  } else if (offset <= top < offset + 872 * index) {
    // 如果滚动条下滑的长度大于初始设定的覆盖长度则正常设置
    links.find('.active').removeClass('active')
    pagelinks.eq(index).addClass('active')
    bindFooter(index)
  }
}


// up 5: 3488~2878  4: 2878~2006  3: 2006~1134  2: 1134~262  1: 262~0
var checkScrollUp = function(top) {
  // 设置下一张背景图为当前活动背景图时其必须覆盖的长度
  var offset = 872 * 0.3
  // 判断当前背景图的索引
  var index = Math.floor((top - offset) / 872) + 1
  var pagelinks = $('.pagelink')
  var links = $('.links')
  if (top < offset) {
    // 如果滚动条上滑的长度小于初始设定的覆盖长度，设定当前活动的背景图为第一张
    index = 0
    links.find('.active').removeClass('active')
    pagelinks.eq(index).addClass('active')
    bindFooter(index)
  } else if (offset <= top < offset + 872 * index) {
    // 如果滚动条上滑的长度大于初始设定的覆盖长度则正常设置
    links.find('.active').removeClass('active')
    pagelinks.eq(index).addClass('active')
    bindFooter(index)
  }
}

// 检查滚动方向，给特定的滚动方向特定的响应
var checkDirection = function(direction) {
  var top = $(window).scrollTop()
  if (direction === 'down') {
    checkScrollDown(top)
  } else if (direction === 'up') {
    checkScrollUp(top)
  }
}

// 设置滚动动画
var move = function(top) {
  var body = $('html, body')
  body.stop().animate({
      scrollTop: top
    },
    1000,
    'easeInOutExpo')
}

// 为小圆点绑定点击事件
var bindLink = function() {
  var links = $('.links')
  // 事件委托形式判断按的是哪个点
  links.click(function(e) {
    var target = $(e.target)
    if (target.hasClass('pagelink')) {
      links.find('.active').removeClass('active')
      target.addClass('active')
      // 是原点，则取出当前原点在原点集合里的索引，并以此求出目标page
      var index = $('.pagelink').index(target)
      var section = $('.page').eq(index)
      // 找到目标page后，求出其相对document的上偏移量，并移动
      var offset = section.offset().top
      move(offset)
      bindFooter(index)
    }
  })
}

// 绑定介绍条动画
var bindFooter = function(index) {
  var footer = $('footer')
  var footers = footer.find('div')
  var current = footers.eq(index)
  footer.find('.show').removeClass('show')
  current.addClass('show')
}

// 初始化页面
var init = function() {
  var page = $('.active')
  var section = $('section:first')
  var offset = section.offset().top
  move(offset)
}

var main = function() {
  bindScroll()
  init()
  bindLink()
}

main()
