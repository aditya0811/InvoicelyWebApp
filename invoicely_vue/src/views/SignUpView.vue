<template>
    <div class="page-signup">
        <div class="columns">
            <!-- is-4 will take 25% of screen, is-offset-4 provie horizontal white space in the left, fills up right -->
            <div class="column is-4 is-offset-4">
                <h1 class="title">Sign up</h1>
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>E-mail</label>
                        <div class="control">
                            <input type="email" name="username" class="input" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <div class="control">
                            <input type="password" name="password" class="input" v-model="password">
                        </div>
                    </div>
                    <div class="notification is-danger" v-if="errors.length">
                        <!-- what is v-bind?? -->
                        <p v-for="error in errors" v-bind:key="error">
                            {{ error }}
                        </p>
                    </div>
                    <div class="control">
                        <button class="button is-success">Sign up</button>
                    </div>
                </form>
                <hr>
                <router-link to="/log-in">Click here</router-link> to log in !
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'SignUp',
    data () {
        return {
            username: '',
            password: '',
            errors:[]
        }
    },
    methods: {
        submitForm(e) {
            const formData = {
                username: this.username,
                password: this.password
            }

            // /users/ This api is defined by djoser, go to base endpoints in its doc
            axios.post("/api/v1/users/", formData)
                .then(response =>{
                    console.log(response)
                    this.$router.push('/log-in')
                })
                .catch(error => {
                    if (error.response) {
                        for(const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                        console.log(JSON.stringify(error.response.data))
                    }
                    else if(error.message) {
                        console.log(JSON.stringify(error.message))
                    } else {
                        console.log(JSON.stringify(error))
                    }
                })
        }
    }
}
</script>