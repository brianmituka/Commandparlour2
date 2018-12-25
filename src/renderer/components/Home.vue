/* eslint-disable */
<template>
<div>

<!-- top bar   -->
<vs-row vs-justify="center" class="topbar">
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="9"> 
<vs-input icon-after icon="search" placeholder="Search" v-model="search" size="large"/>
  </vs-col>  
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3"> 
<vs-button color="primary" text-color icon="add" type="border" @click="addModal=true" class="addbutton">Add new </vs-button>
  </vs-col> 
</vs-row>

<!-- saved stuff section -->
<vs-row  vs-justify="center">
  <vs-col v-for="(command, index) in filteredCommands"  :key="index" vs-w="6" class="savedcards" vs-sm="6" vs-justify="center" vs-align="center">
      <vs-card actionable class="cardx" fixed-height>
        <div slot="header">
          <h3 >
           {{command.title}}
          </h3>
        </div>
        <div>
          <span >{{command.description}}</span>
        </div>
        <div>
          <p> <i icon="label"></i> {{command.tag}}</p>
        </div>
        <div slot="footer">
          <vs-row vs-justify="flex-end">
            <vs-button icon="edit" @click="editCommand(command)" color="primary" type="gradient" >Edit</vs-button>
          </vs-row>
        </div>
      </vs-card>
    </vs-col>
</vs-row>


<!-- Add Modal/Edit Modal -->
<vs-popup classContent="popup-example"  :title="formTitle" :active.sync="addModal">
   <vs-row vs-justify="center">
     <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <vs-input class="inputx" placeholder="Title" v-model="editedCommand.title"/>
     </vs-col>
   </vs-row>
   <vs-row vs-justify="center" class="topbar">
     <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="9">
       <vs-input  class="inputx" placeholder="Tag" v-model="editedCommand.tag"/>
     </vs-col>
   </vs-row>
   <vs-row vs-justify="center" class="topbar">
     <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="9">
       <vs-input  class="inputx" placeholder="Description" v-model="editedCommand.description"/>
     </vs-col>
   </vs-row>
   <vs-row>
     <vs-col vs-type="flex" vs-w="9">
        <vs-button v-if="editedIndex == -1" icon="save" @click="addCommand" class="addbutton"  color="primary" type="border">Save</vs-button>
         <vs-button  v-if="editedIndex != -1 " icon="save" @click="updateCommand" class="addbutton"  color="primary" type="border">Update</vs-button>
     </vs-col>
     <vs-col vs-type="flex" vs-w="3">
       <vs-button v-if="editedIndex != -1" icon="save" @click="addCommand" class="addbutton"  color="danger" type="border">Delete</vs-button>
     </vs-col>
   </vs-row>
      
    </vs-popup>
</div>

</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      title: '',
      tag: '',
      description: '',
      commands: [],
      addModal: false,
      editedIndex: -1,
      editedCommand: {
        title: '',
        tag: '',
        description: ''
      },
      search: '',
      replaced: 0
    }
  },
  methods: {
    addCommand () {
      const commandObject = {
        title: this.editedCommand.title,
        tag: this.editedCommand.tag,
        description: this.editedCommand.description
      }
      this.$db.insert(commandObject, (err, newDoc) => {
        if (err) {
          alert('An error occured')
          return
        } else {
          console.log(newDoc.title + ' Created')
          this.editedCommand = {}
        }
        console.log('I am new' + newDoc)
        console.log(err)
      })
      this.addModal = false
      this.$notify({
        group: 'foo',
        title: 'Command Created',
        text: `Command successfully Created`
      })
    },
    getAllCommands () {
      // console.log(this.$electron)
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
    },
    editCommand (command) {
      this.editedIndex = this.commands.indexOf(command)
      this.editedCommand = Object.assign({}, command)
      this.addModal = true
    },
    updateCommand () {
      // let replaced
      console.log('update begin')
      this.$db.update({_id: this.editedCommand._id}, {tag: this.editedCommand.tag, title: this.editedCommand.title, description: this.editedCommand.description}, {}, function (err, numReplaced) {
        if (err) {
          console.log(err)
        } else {
          console.log('Documents updated:', numReplaced)
          // this.replaced = numReplaced
          if (numReplaced > 0) {
            console.log('Successfully updated')
            // this.$notify({
            //   group: 'foo',
            //   title: 'Important message',
            //   text: 'Hello user! This is a notification!'
            // })
          }
        }
      })
      this.addModal = false
      this.$notify({
        group: 'foo',
        title: 'Command Updated',
        text: `${this.editedCommand.title} updated`
      })
    }
  },
  computed: {
    formTitle () {
      // console.log(this.editedIndex)
      return this.editedIndex === -1 ? 'Add a command' : 'Edit Command'
    },
    filteredCommands: function () {
      return this.commands.filter((command) => {
        return command.tag.toLowerCase().match(this.search)
      })
    }
  },

  beforeMount () {
    this.getAllCommands()
  },
  mounted () {
    // Add event listener to the modal close button so as to switch the formTitle
    const icon = document.querySelectorAll('.vs-popup--close');
    // console.log(`#### ${icon}`);
    [...icon].forEach(element => {
      element.addEventListener('click', () => {
        this.editedIndex = -1
        this.editedCommand = {}
        // console.log(this.editedIndex)
        // console.log('x clicked')
      })
    })
  }
}
</script>
<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Dosis:400,500,600,700,800');
 *{
   font-family: Dosis;
 }
 .topbar{
   margin-top: 20px;
   margin-bottom: 20px;
 }
 .addbutton{
   font-size: 18px;
   font-weight: 500;
 }
 .savedcards{
   margin: 15px;
 }
</style>

