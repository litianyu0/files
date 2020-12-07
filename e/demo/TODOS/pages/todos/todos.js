// pages/todos/todos.js
Page({
    data: {
      // search的input文本框
      input:'',
      // todos的text文本数据
      todos:[
        { name: 'Learning HTML',completed:false },
        { name: 'Learning CSS',completed:true },
        { name: 'Learning JavaScript',completed:false }
      ],
      leftCount: 2,
      allCompleted: false
    },
    // input绑定事件（）
      inputChangeHandle:function(e){
        this.setData({
          input: e.detail.value
        })
      },
      // 1.先让按钮点击时，执行一段代码
      // 2.拿到文本框里面的值
      // 3.由于小程序数据是单项的，必须要给文本注册改变事件
      // 添加item
    addTodoHandle:function(){
      if(!this.data.input) return // 文本框里不输入值，添加失败
      // 当添加按钮点击事件发生执行的函数
      var todos=this.data.todos
      todos.push({
        name: this.data.input,
        completed: false
      })
      // 必须显示的通过setdata区改变数据（把新添加的值更新到data的todos中）
      this.setData({ 
        todos: todos,
        input: '',
        // 点击添加，剩余量加1
        leftCount: this.data.leftCount + 1 
      })
    },
    // 点击item，选中此item
    toggleTodosHandle(e){
      // 切换当前点中的item的完成状态
      var item=this.data.todos[e.currentTarget.dataset.index]
      item.completed = !item.completed
      // 切换状态时，根据completed的状态，决定加1还是-1
      var leftCount=this.data.leftCount + (item.completed ? -1 : 1)
      //把新的todos更新
      this.setData({todos: this.data.todos,leftCount: leftCount})
    },
    // 删除item
    removeTodoHandle:function(e){
      // 切记冒泡行为
      var todos= this.data.todos
      // todos,是splice中移除掉的(index所指向的)元素
     var item = todos.splice(e.currentTarget.dataset.index, 1)[0]
     var leftCount=this.data.leftCount + (item.completed ? 0 : -1)
     this.setData({todos: this.data.todos, leftCount: leftCount}) 
    },
    // 选择所有item
    toggleAllHandle(){
      // this表示的是当前页面对象
      this.data.allCompleted = !this.data.allCompleted
      var todos= this.data.todos
      var that=this
      // 遍历item所有项，把它设为与全选状态一样
      todos.forEach(function (item) {
        // 函数内部不能用this，内外this指代的是不同含义
        item.completed = that.data.allCompleted
      })
      var leftCount=this.data.allCompleted ? 0 : this.data.todos.length
      this.setData({ todos : todos, leftCount: leftCount })
    },
    // 清理完成状态的item
    clearHandle:function(){
      // 法1：产生新数组，把没有完成状态的数据选择出来
      /* var todos= []
      this.data.todos.forEach(function(){
        if(!this.completed){
          todos.push(item)
        }
      })
      this.setData({todos: todos })
      */
      // 法二：用filter过滤
      var todos=this.data.todos.filter(function(item){
        return !item.completed
      })
      this.setData({todos: todos })
    }
  })
