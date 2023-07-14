const app = Vue.createApp({
    data() {
        return {
            tasks: []
        }
    },
    computed: {
        taskCount() {
            return this.tasks.lenght;
        }
    },
    method: {
        addNewTask(newTask)  {
            this.tasks.push(newTask);
        },
        removeTask() {
                this.task.splice(this.tasks.indexOf(task), 1);
        }     
    }
});

app.component(
    "to-do", {
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
    template: `
    <div class="container my-2">
        <p><strong>Tasks Rimaneti: {{ remaining }}</strong></p>
    </div>
    `
});

const mountedApp = app.mount("#app");