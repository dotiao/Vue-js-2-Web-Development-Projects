Vue.component('top-bar', {
    template: `<div class="top-bar" :class="'player-'+currentPlayerIndex">
        <div class="player-0 p0">{{ players[0].name }}</div>
        <div class="turn-counter">
            <img class="arrow" src="svg/turn.svg" />
            <div class="turn">Turn {{ turn }}</div>
        </div>
        <div class="player-1">{{ players[1].name }}</div>
    </div>`,
    props: ['players', 'currentPlayerIndex', 'turn'],
    created() {
        console.log(this.players)
    },
})

Vue.component('card', {
    props: ['def'],
    template: `<div :class="" @click="play" >
        <div>{{ def.title }}</div>
        <img src="svg/card-separator.svg" />
        <div><div v-html="def.description"></div></div>
        <div v-if="def.note"><div v-html="def.note"></div></div>
    </div>`,
    methods: {
        play () {
            this.$emit('play-event', 'orange', 42)
        },
    },
})

Vue.component('hand', {
    props: ['cards'],
    template: `<div class="hand">
        <div class="wrapper">
<!--            卡牌-->
            <div>
                <card v-for="card of cards" v-bind:key="card.id" :def="card.def" />
            </div>
        </div>
    </div>`,
})