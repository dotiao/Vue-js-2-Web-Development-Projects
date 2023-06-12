Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'))

// New VueJS instance
new Vue({
    name: 'notebook',

    // CSS selector of the root DOM element
    el: '#notebook',

    // Some data
    data() {
        return {
            // content: 'This is a note',
            // content: 'I\'m in **bold**!',
            // content: localStorage.getItem('content') || 'You can write in **markdown**',
            // 新的！一个笔记数组
            // notes: [],
            // 选中笔记的ID
            selectedId: localStorage.getItem('selected-id') || null,
            notes: JSON.parse(localStorage.getItem('notes')) || [],
        }
    },
    // Computed properties
    computed: {
        notePreview() {
            // Markdown转换为HTML
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },
        addButtonTitle() {
            return this.notes.length + ' note(s) already'
        },
        selectedNote() {
            // 返回与selectedId匹配的笔记
            return this.notes.find(note => note.id === this.selectedId)
        },
        sortedNotes() {
            return this.notes.slice()
                .sort((a, b) => a.created - b.created)
                .sort((a, b) => (a.favorite === b.favorite) ? 0
                    : a.favorite ? -1
                        : 1)
        },
        linesCount() {
            if (this.selectedNote) {
                // 计算换行符的个数
                return this.selectedNote.content.split(/\r\n|\r|\n/).length
            }
        },

        wordsCount() {
            if (this.selectedNote) {
                var s = this.selectedNote.content
                // 将换行符转换为空格
                s = s.replace(/\n/g, ' ')
                // 排除开头和结尾的空格
                s = s.replace(/(^\s*)|(\s*$)/gi, '')
                // 将多个重复空格转换为一个
                s = s.replace(/\s\s+/gi, ' ')
                // 返回空格数量
                return s.split(' ').length
            }
        },

        charactersCount() {
            if (this.selectedNote) {
                return this.selectedNote.content.split('').length
            }
        },
    },

    // Change watchers
    watch: {
        // 侦听content数据属性
        // content: 'saveNote',
        notes: {
            handler: 'saveNotes',
            deep: true
        },
        // 保存选中项
        selectedId(val) {
            localStorage.setItem('selected-id', val)
        },
    },
    //
    methods: {
        // saveNote(val, oldVal) {
        //     console.log('new note:', val, 'old note:', oldVal)
        //     console.log('saving note:', this.content)
        //     localStorage.setItem('content', this.content)
        //     this.reportOperation('saving')
        // },
        saveNotes() {
            // 在存储之前不要忘记把对象转换为JSON字符串
            localStorage.setItem('notes', JSON.stringify(this.notes))
            console.log('Notes saved!', new Date())
        },
        reportOperation(opName) {
            console.log('The', opName, 'operation was completed!')
        },
        // 用一些默认值添加一条笔记，并将其添加到笔记数组中
        addNote() {
            const time = Date.now()
            // 新笔记的默认值
            const note = {
                id: String(time),
                title: 'New note ' + (this.notes.length + 1),
                content: '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                created: time,
                favorite: false,
            }
            // 添加到列表中
            this.notes.push(note)
        },
        selectNote(note) {
            this.selectedId = note.id
        },
        removeNote() {
            if (this.selectedNote && confirm('Delete the note?')) {
                // 将选中的笔记从笔记列表中移除
                const index = this.notes.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index, 1)
                }
            }
        },
        favoriteNote() {
            this.selectedNote.favorite = !this.selectedNote.favorite
        },
    },

    created() {
        this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    },
})
