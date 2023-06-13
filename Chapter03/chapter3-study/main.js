new Vue({
    name: 'game',
    el: '#app',
    template: `<div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
<!--        <card :def="testCard" @click.native="handlePlay"/>-->
        <card :def="testCard" @play-event="handlePlayEvent"/>
    </div>`,
    data: state,
    computed: {
        testCard() {
            return cards.archers
        },
    },
    methods: {
        handlePlay() {
            console.log('You played a card!')
        },
        handlePlayEvent(color, number) {
            console.log('handle play event', 'color=', color, 'number=', number)
        }
    }
})

// 窗口大小变化的处理
window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})