<template>
    <o-modal v-model:active="isModalActive">
        <div class="modal-container">
            <o-field label="Title">
                <o-input
                    type="text"
                    v-model="title"
                    placeholder="Post title"
                    required>
                </o-input>
            </o-field>
            <o-field label="Content">
                <o-input
                    maxlength="200"
                    type="textarea"
                    v-model="body"
                    placeholder="Enter post content."
                    required
                ></o-input>
            </o-field>

            <div class="button-panel">
                <o-button variant="info" @click="pushComment">Save Post</o-button>
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
            editId: Number
        },
        data() {
            return {
                title: (this.editId && this.$store.getters.getPostById(this.editId).title) || '',
                body: (this.editId && this.$store.getters.getPostById(this.editId).body) || ''
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
                    this.title = this.$store.getters.getPostById(this.editId).title;
                    this.body = this.$store.getters.getPostById(this.editId).body;
                }
            }
        },
        methods: {
            pushComment() {
                let dispatch;
                if (this.editId) {
                    const thisPost = this.$store.getters.getPostById(this.editId);
                    thisPost.title = this.title;
                    thisPost.body = this.body;
                    dispatch = this.$store.dispatch('editPost', thisPost);
                } else {
                    dispatch = this.$store.dispatch('pushPost', {
                        body: this.body,
                        title: this.title
                    });
                }
                dispatch.then(() => {
                    this.$emit('close');
                    this.title = '';
                    this.body = '';
                });
            }
        },
    }
</script>
