$(function () {
  var layer = layui.layer

  initTable()

  // 初始化表格的数据
  function initTable() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取表格数据失败！')
        }
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 点击添加按钮
  var addIndex = null
  $('#showAdd').on('click', function () {
    // 弹出一个【页面层 type:1 】
    addIndex = layer.open({
      type: 1, // 页面层
      title: '添加文章分类', // 标题
      content: $('#tpl-add').html(), // 弹出层的主体
      area: ['500px', '250px'] // 设置层的宽和高
    })
  })

  // console.log($('#form-add'))

  // // 为添加的表单绑定 submit 事件
  // $('#form-add').on('submit', function (e) {
  //   e.preventDefault()
  //   console.log('ok')
  // })

  // 通过代理的方式，为添加的表单绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('添加文章分类失败！')
        }
        layer.msg('添加文章分类成功！')
        // 刷新表格的数据
        initTable()
        // 调用 layer.close() 关闭层
        layer.close(addIndex)
      }
    })
  })
})
