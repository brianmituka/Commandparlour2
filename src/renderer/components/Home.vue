/* eslint-disable */
<template>
<div class="main">
  <div class="header">
<input placeholder="Search commands" class="search" id="search">
</div>
<div class="recent">
    <h3>Add a command</h3>
    <input type="text" class="commandfields" v-model="command">
    <input type="text" class="commandfields" v-model="description">
    <input type="text" class="commandfields" v-model="tag"> 
    <button class="savebutton" @click ="addCommand">Save command</button>
</div>

<div>
<h1>Saved commands</h1>
<div v-for="(command, index) in commands"  :key="index" class="saved brick">
 <h3>Name: {{command.command}}</h3>
 <h3>Tag: {{command.tag}}</h3>
 <h3>Description: {{command.description}}</h3>
 <h3>Created: {{command.createdAt}}</h3>
 <h3>Updated: {{command.updatedAt}}</h3>
</div>
</div>
<div>
</div>  
</div>
</template>
<script>
// const DataStore = require('nedb')
// const db = new DataStore({
//   inMemoryOnly: true
// })
export default {
  name: 'home',
  data () {
    return {
      command: '',
      tag: '',
      description: '',
      commands: []
    }
  },
  methods: {
    addCommand () {
      console.log('I am working')
      const commandObject = {
        command: this.command,
        tag: this.tag,
        description: this.description
      }
      this.$db.insert(commandObject, function (err, newDoc) {
        if (err) {
          alert('An error occured')
        } else {
          alert(newDoc.command + ' Created')
        }
        console.log(newDoc)
        console.log(err)
      })
    },
    getAllCommands () {
      console.log(this.$electron)
      this.$db.find({}, (err, docs) => {
        if (err) {
          console.log(err)
        } else {
          docs.forEach(command => {
            console.log(command)
            this.commands.push(command)
          })
        }
      })
    }
  },
  beforeMount () {
    this.getAllCommands()
  }
}
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Dosis:400,500,600,700,800');

 .brick {
      height: 200.516px;
      position: relative;
      min-height: 1px;
      padding-left: 25px;
      padding-right: 25px;
      width: 463.328px;
    }

 body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Dosis, sans-serif;
      font-size: 16px;
      line-height: 1.42857143;
      color: #435b71;
      background-color: #f8f8f8;
    }
.main{
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
}
.header{
    max-width: 50%;
}
.search{
    border-radius:5px;
}
.recent{
    display: flex;
    flex-direction: column;
}
.commandfields{
    margin-top: 20px;
    border-radius: 5px;
}
.savebutton{
    margin-top: 15px;
}
</style>

