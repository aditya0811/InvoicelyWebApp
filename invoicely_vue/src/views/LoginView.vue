<template>
    <div class="page-login">
        <div class="columns">
            <!-- is-4 will take 25% of screen, is-offset-4 provie horizontal white space in the left, fills up right -->
            <div class="column is-4 is-offset-4">
                <h1 class="title">Log in</h1>
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Username</label>
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
                        <button class="button is-success">Login</button>
                    </div>
                </form>
                <hr>
                <router-link to="/sign-up">Click here</router-link> to sign up !
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'LogIn',
    data () {
        return {
            username: '',
            password: '',
            errors:[]
        }
    },
    methods: {
        async submitForm(e) {
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")

            const formData = {
                username: this.username,
                password: this.password
            }

        await axios.post('/api/v1/token/login/', formData)
                .then(response => {
                    const token = response.data.auth_token

                    this.$store.commit('setToken', token)

                    axios.defaults.headers.common["Authorization"] = "Token " + token
                    
                    localStorage.setItem("token", token)
                    console.log(response)
                    console.log("this is token: " + token)
                    
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

                // When adding await, will make below axios exeute only when above axios is executed
            axios
                .get("/api/v1/users/me")
                .then(response => {
                    this.$store.commit('setUser', {'username' : response.data.username, 'id' : response.data.id})
                    localStorage.setItem('username', response.data.username)
                    localStorage.setItem('userid', response.data.id)

                    this.$router.push('/dashboard')
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        }
    }
}
</script>