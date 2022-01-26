<template>
    <section>
        <div class="posts-options">
            <o-field class="posts-filter">
                <o-input
                    type="text"
                    v-model="titleFilter"
                    placeholder="Filter posts by name"
                    icon="search"
                ></o-input>
            </o-field>
            <o-button
                class="post-sort"
                icon-pack="fas"
                variant="info"
                icon-left="sort"
                outlined
                @click="reversePosts()"
            >Sort</o-button>
        </div>
        <div class="divider"></div>
        <div :class="containerClasses">
            <div :class="`single-post ${activePost === post.id && 'active-post'}`" @click="clickHandler(post)" v-for="post in posts" :key="post.id">
                <div class="post-title-container">
                    <o-button
                        class="post-edit"
                        icon-pack="fas"
                        variant="info"
                        icon-left="edit"
                        size="small"
                        outlined
                        @click="editPostModal(post.id)"
                    >Edit</o-button>
                    <h4 class="post-title">{{post.title}}</h4>
                    <o-button
                        class="post-delete"
                        icon-pack="fas"
                        variant="info"
                        icon-left="minus"
                        size="small"
                        outlined
                        @click="deletePost(post.id)"
                    >Delete</o-button>
                </div>
                <p class="post-body">{{post.body}}</p>
            </div>
        </div>
        <div class="divider"></div>
        <o-button
            class="post-add"
            icon-pack="fas"
            variant="info"
            icon-left="plus"
            outlined
            @click="addPostModal()"
        >Add post</o-button>
        <div class="divider"></div>
        <AddPostModal :modalActive="isModalActive" :editId="editId" @close="close"/>
    </section>
</template>

<script>
import AddPostModal from './AddPostModal.vue';
export default {
    name: 'PostDisplay',
    data() {
        return {
            isModalActive: false,
            editId: null,
            containerStyle: 'full-posts',
            titleFilter: '',
            sortList: false
        };
    },
    components: {
        AddPostModal
    },
    computed: {
        activePost() {
            return this.$store.getters.getActivePost;
        },
        posts() {
            if (this.titleFilter.length) {
                return this.$store.getters.getPosts.filter((post) => post.title.includes(this.titleFilter));
            }
            return this.$store.getters.getPosts;
        },
        containerClasses() {
            return `posts-container ${this.containerStyle}`;
        }
    },
    methods: {
        clickHandler(post) {
            this.containerStyle = 'half-posts';
            this.$store.dispatch('setComments', { postId: post.id });
        },
        close() {
            this.isModalActive = !this.isModalActive;
            return true;
        },
        deletePost(id) {
            this.$store.dispatch('deletePost', { id: id });
        },
        addPostModal() {
            this.isModalActive = true;
            this.editId = null;
        },
        editPostModal(id) {
            this.isModalActive = true;
            this.editId = id;
        },
        reversePosts() {
            this.sortList = !this.sortList;
            let sortedList = [...this.$store.getters.getPosts];
            if (this.sortList === true) {
                sortedList.sort((prev, current) => current.id - prev.id);
            } else {
                sortedList.sort((prev, current) => prev.id - current.id);
            }
            this.$store.commit('setPosts', sortedList);
        }

    },
    created() {
        this.$store.dispatch('setPosts');
    }
}
</script>

<style scoped>
    .posts-options {
        display: flex;
        justify-content: center;
        column-gap: 1rem;
    }
    .posts-filter {
        max-width: 300px;
    }
    .half-posts {
        max-height: calc(50vh - 175px);
    }
    .full-posts {
        max-height: calc(100vh - 95px);
    }
    .posts-container {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .single-post {
        border: 1px solid gray;
        margin: 1rem auto;
        border-radius: 0.5rem;
        padding: 0.75rem;
        width: 25rem;
        cursor: pointer;
    }
    .post-title-container {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid gray;
        margin-bottom: .5em;
    }
    .post-title {
        padding: 0 0 0.75rem 0;
        margin: 0 0 0.75rem 0;
    }
    .post-body {
        margin: 0;
        text-align: left;
    }
    .active-post {
        background-color: rgb(240, 240, 240);
    }
    .post-add {
        margin: 1rem 0;
    }
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) { 
        
    }
</style>
