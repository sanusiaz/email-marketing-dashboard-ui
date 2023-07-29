<template>
    <div>
        <canvas id="bar-chart" width="412" height="437" style="display: block; height: 350px; width: 330px;"
            class="chartjs-render-monitor"></canvas>
    </div>
</template>

<script>

import axios from 'axios'
export default {
    name: 'PerformanceChart',
    data() {
        return {
            sentEmails: []
        }
    },
    methods: {
        async getLiveSentEmailPerformance() {
            try {
                let __response = await axios.get('/overview/sent/emails')

                if (__response.status === 200 && __response.statusText !== 'error') {
                    if ( this.sentEmails !== __response.data.data.monthlySentEmails ) {

                        this.sentEmails = __response.data.data.monthlySentEmails
                        this.parseCharts()
                    }

                }
            } catch (error) {
            }

        },
        parseCharts() {
            if ( Chart !== undefined && document.getElementById('bar-chart') !== null ) {
                var ctx = document.getElementById('bar-chart').getContext('2d');
                var chart = new Chart(ctx, {

                    type: 'bar',

                    data: {
                        labels: ["Jan", "Feb", "March", "April", "May", "June", "Jully", "Aug", "Sept", "Oct", "Nove", "Dec"],
                        datasets: [{
                            label: "Delivered Emails",
                            backgroundColor: 'rgba(245,34,34,.5)',
                            borderColor: 'rgba(245,34,34,1)',
                            data: this.sentEmails,
                        }]
                    },

                    options: {
                        responsive: true,
                        title: {
                            display: false,
                            text: 'Showing Sent Emails Delivered to Inbox'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true,
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Months'
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Sent Emails'
                                }

                            }]
                        }
                    }
                });
                var mediaQuery = window.matchMedia('(min-width: 768px)');

                function toggleAspectRatio(mq) {
                    chart.options.maintainAspectRatio = mq.matches;
                    chart.resize();
                }

                toggleAspectRatio(mediaQuery);

                mediaQuery.addListener(toggleAspectRatio);
            }
        }
    },
    mounted() {
        this.getLiveSentEmailPerformance();
        setInterval(() => {  
            this.getLiveSentEmailPerformance();
        }, (1000) * 60 * 2);

    }
}
</script>

<style lang="scss" scoped></style>