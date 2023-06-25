<template>
    <div>
        <canvas id="bar-chart" width="412" height="437" style="display: block; height: 350px; width: 330px;" class="chartjs-render-monitor"></canvas>
    </div>
</template>

<script>
export default {
    name: 'PerformanceChart',
    mounted() {
        var ctx = document.getElementById('bar-chart').getContext('2d');
        var chart = new Chart(ctx, {

            type: 'bar',

            data: {
                labels: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
                datasets: [{
                    label: "Año 2018",
                    backgroundColor: 'rgba(245,34,34,.5)',
                    borderColor: 'rgba(245,34,34,1)',
                    data: [801, 892, 874, 862, 874, 907, 932, 929, 924, 953, 1031, 987],
                }]
            },

            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart type: Vertical bar simple'
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
                            display: false,
                            labelString: 'Mois'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Eur/1000L'
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
</script>

<style lang="scss" scoped></style>