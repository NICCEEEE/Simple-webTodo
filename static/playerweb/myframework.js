var log = function(){
  console.log.apply(console, arguments)
}

// 改变传入元素的的状态
var toggleStatus = function(element, classStatus) {
    // 拥有该状态则删除，否则加上
    if (element.classList.contains(classStatus)) {
      element.classList.remove(classStatus)
    } else {
      element.classList.add(classStatus)
    }
}

log('导入成功')
