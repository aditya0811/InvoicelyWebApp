<template>
    <div class="page-edit-team">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Edit team</h1>
            </div>

            <div class="column is-12">
                <div class="field">
                    <label>Name</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.name">
                    </div>
                </div>
                <div class="field">
                    <label>Org. number</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.org_number">
                    </div>
                </div>
                <div class="field">
                    <label>First Invoice number</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.first_invoice_number">
                    </div>
                </div>
                <div class="field">
                    <label>Bankaccount</label>
                    <div class="control">
                        <input type="text" class="input" v-model="team.bankaccount">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-success" @click="submitForm">Save</button>   
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
    name :'EditTeam',
    data() {
        return {
            team : {}
        }
    },
    async mounted() {
        await this.getOrCreateTeam()
    },
    methods : {
        getOrCreateTeam() {
            // If not team is present it will create one
            axios
                .get('/api/v1/teams/')
                .then(response =>{
                    this.team = response.data[0]
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        },
        submitForm() {
            const teamID = this.team.id
            axios
                .patch(`/api/v1/teams/${teamID}/`, this.team)
                .then(response =>{

                    toast ({
                        message: 'The changes was saved',
                        type : 'is-success',
                        // this means we can quit this
                        dismissible: true, 
                        pauseOnHover: true,
                        // This is in millisecond
                        duration: 2000,
                        position:'bottom-right',
                    })

                    this.$router.push('/dashboard/my-account')
                })
                .catch(error =>{
                    console.log(JSON.stringify(error))
                })
        }
    }
}

</script>