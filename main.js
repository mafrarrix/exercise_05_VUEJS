const app = Vue.createApp({
    data() {
        return {
            tasks: []
        }
    },
    computed: {
        taskCount() {
            return this.tasks.length;
        }
    },
    methods: {
        addNewTask(newTask)  {
            this.tasks.push(newTask);
        },
        removeTask(task) {
                this.task.splice(this.tasks.indexOf(task), 1);
        }     
    }
});

app.component(
    "to-do", {
        emit: ["add-task"],
        props: {
            tasks: {
                type: Array,
                required: true
            },
            remaining: {
                type: Number,
                required: true
            }
    },
    data(){
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

    template: `
    <div class="container my-2">
        <p><strong>Tasks Rimaneti: {{ remaining }}</strong></p>
        <input v-model="newTask" 
        calss="form-control" type="text" 
        placeholder="to-do insert" 
        @keyup.enter="submitTask">
        <br>
        <div v-for="task in tasks">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                {{ task }}
                <button @click="removeTask(task)" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
             </button>
</div>  
        </div>

    </div>
    `
});

const mountedApp = app.mount("#app");