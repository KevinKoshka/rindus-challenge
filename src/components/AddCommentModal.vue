<template>
    <o-modal v-model:active="isModalActive">
        <div class="modal-container">
            <o-field label="Name">
                <o-input
                    type="text"
                    v-model="name"
                    placeholder="Your name"
                    required>
                </o-input>
            </o-field>
            <o-field label="Email">
                <o-input
                    type="email"
                    v-model="email"
                    placeholder="Your email"
                    required>
                </o-input>
            </o-field>
            <o-field label="Comment">
                <o-input
                    maxlength="200"
                    type="textarea"
                    v-model="body"
                    placeholder="Enter comment."
                    required
                ></o-input>
            </o-field>

            <div class="button-panel">
                <o-button variant="info" @click="pushComment()" >Save Comment</o-button>
                <o-button type="button" outlined @click="$emit('close')">Close</o-button>
            </div>
        </div>
    </o-modal>
</template>

<script>
    export default {
        name: 'AddCommentModal',
        props: {
            modalActive: Boolean,
            editId: Number,
        },
        data() {
            return {
                email: (this.editId && this.$store.getters.getCommentById(this.editId).email) || '',
                name: (this.editId && this.$store.getters.getCommentById(this.editId).email) || '',
                body: (this.editId && this.$store.getters.getCommentById(this.editId).body) || ''
            };
        },
        computed: {
            isModalActive: {
                get() {
                    return this.modalActive;
                }
            }
        },
        watch: {
            editId(newId) {
                if (newId) {
                    this.email = this.$store.getters.getCommentById(this.editId).email;
                    this.name = this.$store.getters.getCommentById(this.editId).name;
                    this.body = this.$store.getters.getCommentById(this.editId).body;
                }
            }
        },
        methods: {
            pushComment() {
                let dispatch;
                if (this.editId) {
                    const thisComment = this.$store.getters.getCommentById(this.editId);
                    thisComment.email = this.email;
                    thisComment.name = this.name;
                    thisComment.body = this.body;
                    dispatch = this.$store.dispatch('editComment', thisComment);
                } else {
                    dispatch = this.$store.dispatch('pushComment', {
                        body: this.body,
                    name: this.name,
                    email: this.email
                    });
                }
                dispatch.then(() => {
                    this.$emit('close');
                    this.email = '';
                    this.body = '';
                    this.email = '';
                });
            }
        },
    }
</script>
