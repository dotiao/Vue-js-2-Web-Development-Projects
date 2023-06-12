Vue.component('top-bar', {
    template: `<div class="top-bar" :class="'player-'+currentPlayerIndex">
        <div>{{ players[0].name }}</div>
        <div>
            <img src="svg/turn.svg" />
            <div>Turn {{ turn }}</div>
        </div>        
        <div>{{ players[1].name }}</div>
    </div>`,
    props: ['players', 'currentPlayerIndex', 'turn'],
    created() {
        console.log(this.players)
    },
})