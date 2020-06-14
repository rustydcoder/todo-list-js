class Todo {
   constructor(input, btn, con) {
      this.input = input
      this.con = con
      this.btn = btn
      this.idx = 1
   }

   addToList() {
      const val = this.input.value
      const lists = document.querySelector(this.con)
      this.insertToDom(lists, val, this.idx++)
   }

   insertToDom(listCon, val, id = '') {
      const regex = (/([^\s])/)
      if (regex.test(val)) {
         listCon.insertAdjacentHTML('beforeend', `
            <div class="list-item" data-id="${id}">
               <span>${val.trim()}</span>
               <input type='checkbox' class='checkboxes' value='${val}'> 
               <button class='deleteBtn'>Remove</button>
               <br />
            </div>
         `)
      }
   }

   checks() {
      const checkbox = document.getElementsByClassName('checkboxes')
      const allCheckBox = [...checkbox]
      allCheckBox.forEach(checkbox => {
         checkbox.addEventListener('click', function (event) {
            if (this.checked) {
               const parent = event.target.parentNode
               parent.classList.add('done')
            } else {
               const parent = event.target.parentNode
               parent.classList.remove('done')
            }
         })
      })
      this.removeFromStorage()
   }

   saveToStorage() {
      const checkbox = document.getElementsByClassName('checkboxes')
      const listItems = document.getElementsByClassName('list-item')
      let list = new Array()
      for (let i = 0; i < checkbox.length; i++) {
         let listObj = {}
         listObj.id = listItems[i].dataset.id;
         listObj.text = checkbox[i].value

         list.push(listObj)
      }
      localStorage.setItem('currentList', JSON.stringify(list))
   }

   getFromStorage() {
      const lists = document.querySelector(this.con)
      if (localStorage.getItem('currentList')) {
         const value = JSON.parse(localStorage.getItem('currentList'))
         value.forEach(({ id, text }) => {
            this.insertToDom(lists, text, id)
            this.idx = parseFloat(id) + 1
         })
         this.checks()
      }
   }

   removeFromStorage() {
      const button = document.getElementsByClassName('deleteBtn')
      const allBtn = [...button]

      const getItem = localStorage.getItem('currentList')
      const value = getItem ? JSON.parse(getItem) : [];

      allBtn.forEach(btn => {
         btn.addEventListener('click', (event) => {
            const parentId = event.target.parentNode.dataset.id
            let newList = this.compareIds(value, parentId);
            localStorage.setItem('currentList', JSON.stringify(newList))
            event.target.parentNode.parentNode.removeChild(event.target.parentNode)
         })
      })
   }

   compareIds(arr, id) {
      let index
      for (let i = 0; i < arr.length; i++) {
         if (arr[i].id == id) {
            index = i
         }
      }
      arr.splice(index, 1)
      return arr
   }

   init() {

      this.btn.addEventListener('click', () => {
         this.addToList()
         this.checks()
         this.input.value = '';
         this.input.focus()
         this.saveToStorage()
      })

      this.input.addEventListener('keypress', (e) => {
         if (e.keyCode == 13 || e.which == 13) {
            this.addToList()
            this.checks()
            this.input.value = '';
            this.input.focus()
            this.saveToStorage()
         }
      })

      this.getFromStorage()
   }


}

const input = document.getElementById('do')
const btn = document.getElementById('click')

const todo = new Todo(input, btn, '#list')
todo.init()