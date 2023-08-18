const app = Vue.createApp({
    data() {
        return {
            tasks: []
        }
    },
    computed: { // Qui sostanzialmente tengo traccia della quantità dei task aggiunti in real-time
        taskCount() {
            return this.tasks.length;
        }
    },
    methods: { //aggiungo e cancello i task
        addNewTask(newTask)  {
            this.tasks.push(newTask);
        },
        removeTask(task) {
                this.tasks.splice(task.indexOf(task), 1);
        }     
    }
});

app.component(
    "to-do", {
        emits: ["add-task", "remove-task"], // Qesto mi serve solo per avere una visione di insieme
        props: { // Qui dichiaro le propietà del componente "to-do" che verrà integrato nella pagina html
            tasks: {
                type: Array,
                required: true
            },
            remaining: {
                type: Number,
                required: true
            }
    },
    data(){ // Qui definisco propietà che vengono passate alla pagina
        return{
            error: null,
            newTask: null
        }
    },
    methods:{
        submitTask(){
            if (this.newTask){
                this.$emit("add-task", this.newTask);
                this.newTask = null;

                if(this.error) {
                    this.error = null;
                }
            }else{
                this.error = "Empty!";
            }
        },
        removeTask(task){
            this.$emit("remove-task", task);
        }

    },

    // Questo html verrà renderizzato all'interno del div dove verrà montato il componente
    template: `
    <div class="container my-2">
        <p><strong>Tasks Rimaneti: {{ remaining }}</strong></p>
        <input v-model="newTask"  calss="form-control" type="text"  placeholder="to-do insert"  @keyup.enter="submitTask">
        <br>
        <div v-for="task in tasks">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                {{ task }}
                <button @click="removeTask(task)" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>  
        </div>
        <p v-if="error">{{ error }}</p>
        <p v-if="remaining === 0"></p>
    </div>
    `
});

const mountedApp = app.mount("#app");