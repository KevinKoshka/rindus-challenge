<template>
    <section class="comment-section-container" v-if="getActivePost">
        <h3>Comment Section</h3>
        <div class="divider"></div>
        <div class="comment-container">
            <div class="single-comment" v-for="comment in getComments" :key="comment.id">
                <div class="comment-title-container">
                    <div class="comment-title">
                        <span class="comment-name"><b>Name: </b>{{comment.name}}</span>
                        <span class="comment-email"><b>Email: </b>{{comment.email}}</span>
                    </div>
                    <div class="comment-buttons">
                        <o-button
                            class="comment-edit"
                            icon-pack="fas"
                            variant="info"
                            icon-left="edit"
                            size="small"
                            outlined
                            @click="editCommentModal(comment.id)"
                        >Edit</o-button>
                        <o-button
                            class="comment-delete"
                            icon-pack="fas"
                            variant="info"
                            icon-left="minus"
                            size="small"
                            outlined
                            @click="deleteComment(comment.id)"
                        >Delete</o-button>
                    </div>    
                </div>
                    
                <p class="comment-body">{{comment.body}}</p>
            </div>
        </div>
        <div class="divider"></div>
        <o-button
            class="comment-add"
            icon-pack="fas"
            variant="info"
            icon-left="plus"
            outlined
            @click="addCommentModal()"
        >Add comment</o-button>
        <AddCommentModal :modalActive="isModalActive" :editId="editId" @close="close"/>
    </section>
</template>

<script>
    import AddCommentModal from "./AddCommentModal.vue";
    export default {
        name: 'CommentDisplay',
        data() {
            return {
                isModalActive: false,
                editId: null,
            }
        },
        components: {
            AddCommentModal,
        },
        computed: {
            getComments() {
                return this.$store.getters.getComments;
            },
            getActivePost() {
                return this.$store.getters.getActivePost;
            },
        },
        methods: {
            close() {
                this.isModalActive = !this.isModalActive;
                return true;
            },
            deleteComment(id) {
                this.$store.dispatch('deleteComment', { commentId: id });
            },
            editCommentModal(id) {
                this.isModalActive = true;
                this.editId = id;
            },
            addCommentModal() {
                this.isModalActive = true;
                this.editId = null;
            }
        }
    }
</script>

<style scoped>
    .comment-container {
        max-height: 45vh;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .comment-header-container {
        display: flex;
        justify-content: space-between;
        width: 60vw;
        margin: auto;
        align-items:center
    }
    .single-comment {
        border: 1px solid gray;
        margin: 1rem auto;
        border-radius: 0.5rem;
        padding: 0.75rem;
        width: 25rem;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    .comment-title-container {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid gray;
        align-items: center;
    }
    .comment-title {
        display: flex;
        flex-direction: column;
        margin-right: 1rem;
    }
    .comment-buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        row-gap: 0.5em;
    }
    .comment-name {
        margin-bottom: .5rem;
        text-align: left;
    }
    .comment-email {
        padding-bottom: .5rem;
        text-align: left;
    }
    .comment-body {
        text-align: left;
        margin-bottom: 0
    }
    .comment-add {
        margin: 1rem 0;
    }
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) { 
        .comment-header-container {
            width: 100%;
            column-gap: 1rem;
        }
    }
</style>