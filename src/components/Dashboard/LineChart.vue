<template>
    <div>
        <canvas id="line-chart" width="906" height="437" style="display: block; height: 350px; width: 725px;"
            class="chartjs-render-monitor"></canvas>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'LineChart',
    data() {
        return {
            bounceRecords : []
        }
    },
    methods: {
        async getBouncedEmailData()
        {
            try {
                let __response = await axios.get('/overview/bounce/emails')
                if ( __response.status === 200 && __response.statusText !== 'error' ) {
                    console.log(__response)
                    this.bounceRecords = __response.data.last7DaysData
                    this.parseCharts()
                }                 
            } catch( error ) {
                console.error(error)
            }
        },

        parseCharts() {
            if ( Chart !== undefined && document.getElementById("line-chart") !== null ) {
                new Chart(document.getElementById("line-chart"), {
                    type: 'line',
                    data: {
                        labels: ['1st Day', '2nd Day', '3rd Day', '4th Day', '5th Day', '6th Day', '7th Day'],
                        datasets: [{
                            data: this.bounceRecords.smtpError,
                            label: "SMTP Error",
                            borderColor: "#3e95cd",
                            fill: false
                        }, {
                            data: this.bounceRecords.failedEmails,
                            label: "Failed Email",
                            borderColor: "#c45850",
                            fill: false
                        }, {
                            data: this.bounceRecords.queuedEmails,
                            label: "Queued Emails",
                            borderColor: "#3cba9f",
                            fill: false
                        }, {
                            data: this.bounceRecords.processingEmails,
                            label: "Processing Emails",
                            borderColor: "#8e5ea2",
                            fill: false
                        }
                        ]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Showing Failed Emails, Smtp Error, Queued Emails, Processing Emails'
                        }
                    }
                });
            }
        }
    },
    

    mounted() {
        
        this.getBouncedEmailData()

        setInterval(() => {
            this.getBouncedEmailData()
        }, ( 1000 ) * 60 * 2);
       
    },
}
</script>

<style lang="scss" scoped></style>