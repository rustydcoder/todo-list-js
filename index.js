"use strict"
class Todo {
   constructor(input, btn, container) {
      this.input = document.querySelector(input)
      this.container = document.querySelector(container)
      this.btn = document.querySelector(btn)

      this._data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
         todo: [],
         state: true
      }
   }

   addToList() {
      const val = this.input.value
      const regex = (/([^\s])/)
      if (regex.test(val) && !this._data.todo.includes(val)) {
         this.insertToDom(val)
         this._data.todo.push(val)
         this.updateSavedData()
      }

      this.input.value = '';
      this.input.focus()
   }

   insertToDom(val) {
      const list = document.createElement('div')
      const span = document.createElement('span')
      span.innerText = val.trim()
      list.classList.add('list-item')

      const div = document.createElement('div')
      div.classList.add('btns')

      const removeBtn = document.createElement('button')
      removeBtn.innerText = 'remove'
      removeBtn.classList.add('remove')
      removeBtn.addEventListener('click', (event) => this.removeFromList(event))

      const checkbox = document.createElement('input')
      checkbox.classList.add('checkbox')
      checkbox.type = 'checkbox'
      checkbox.value = val.trim()
      checkbox.addEventListener('click', (event) => this.completeItem(event))

      list.appendChild(span)
      div.appendChild(checkbox)
      div.appendChild(removeBtn)
      list.appendChild(div)

      this.container.insertBefore(list, this.container.childNodes[0])
   }

   emptyState() {
      this.container.insertAdjacentHTML('afterend', `
      <div class="empty-state">
        <h3 class="empty-state__title">Add Your Todo</h3>
        <img src="empty-state.png" class="empty-state_img" alt="Add to do">
        <p class="empty-state__description">
          What do you want to get done today?
        </p>
      </div>
      `)
   }

   updateSavedData() {
      this._data.state = this._data.todo.length > 0 ? false : true
      localStorage.setItem('todoList', JSON.stringify(this._data))
   }

   removeFromList(event) {
      const item = event.target.parentNode.parentNode;
      const parent = item.parentNode
      const id = (/done/).test(item.className)
      const value = item.firstElementChild.innerText

      if (!id) {
         this._data.todo.splice(this._data.todo.indexOf(value), 1)
      }

      this.updateSavedData()
      parent.removeChild(item)
   }

   completeItem(event) {
      const item = event.target.parentNode.parentNode;
      const id = (/done/).test(item.className)
      const value = event.target.value

      console.log(event.target.checked, item, value)
      if (event.target.checked) {
         item.classList.add('done')
      }
      else {
         item.classList.remove('done')
      }

      if (id) {
         this._data.todo.push(value)
      } else {
         this._data.todo.splice(this._data.todo.indexOf(value), 1)
      }

      this.updateSavedData()
   }

   renderTodoList() {
      this.emptyState()
      this._data.todo.forEach(val => {
         this.insertToDom(val)
      })
   }

   init() {
      this.renderTodoList()

      this.btn.addEventListener('click', () => {
         this.addToList()
      })

      this.input.addEventListener('keypress', (e) => {
         if (e.keyCode == 13 || e.which == 13) {
            this.addToList()
         }
      })

   }

}

const todo = new Todo('#do', '#click', '#list')
todo.init()