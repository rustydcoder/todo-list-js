class Todo {
   constructor(input, btn, con) {
      this.input = input
      this.con = con
      this.btn = btn
   }

   addToList() {
      const val = this.input.value
      const lists = document.querySelector(this.con)
      this.insertToDom(lists, val)
   }

   insertToDom(listCon, val) {
      const regex = (/([^\s])/)
      if (regex.test(val)) {
         listCon.insertAdjacentHTML('beforeend', `
            <div class="list-item">
               <span>${val.trim()}</span>
               <input type='checkbox' class='checkboxes' value='${val}'> 
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
   }

   saveToStorage() {
      const checkbox = document.getElementsByClassName('checkboxes')
      let list = [...checkbox].map(each => each.value)
      localStorage.setItem('currentList', JSON.stringify(list))
   }

   getFromStorage() {
      const lists = document.querySelector(this.con)
      if (localStorage.getItem('currentList')) {
         const listValue = JSON.parse(localStorage.getItem('currentList'))

         listValue.forEach(val => this.insertToDom(lists, val))

         this.checks()
      }
   }


   init() {
      this.getFromStorage()

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
   }


}

const input = document.getElementById('do')
const btn = document.getElementById('click')

const todo = new Todo(input, btn, '#list')
todo.init()

