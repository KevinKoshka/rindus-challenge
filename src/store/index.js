import { createStore } from "vuex";

export default createStore({
    state: {
        posts: null,
        comments: null,
        activePost: null
    },
    getters: {
        getPosts: (state) => state.posts,
        getComments: (state) => {
            return state.comments && state.comments.filter((comment) => {
                return comment.postId === state.activePost;
            });
        },
        getAllComments: (state) => state.comments,
        getActivePost: (state) => state.activePost,
        getPostById: (state) => {
            return (id) => state.posts.find((post) => {
                return post.id === id;
            });
        },
        getCommentById: (state) => {
            return (id) => state.comments.find((comment) => {
                return comment.id === id;
            });
        }
    },
    mutations: {
        setPosts(state, payload) {
            state.posts = payload;
        },
        setComments(state, payload) {
            state.comments = payload;
        },
        setActivePost(state, payload) {
            state.activePost = payload;
        }
    },
    actions: {
        async setPosts(context) {
            const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
                .then((res) => res.json())
                .then((json) => json)
            context.commit('setPosts', await posts);
        },
        async setComments(context, { postId }) {
            if (context.getters.getPosts && !context.getters.getAllComments) {
                const comments = await fetch(`https://jsonplaceholder.typicode.com/comments`)
                    .then((res) => res.json())
                    .then((json) => json);
                context.commit('setComments', await comments);
            }
            context.commit('setActivePost', postId);
        },
        async pushComment(context, { name, email, body }) {
            const postId = context.getters.getActivePost;
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    body: body,
                    email: email
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then((json) => {
                    const allComments = context.getters.getAllComments;
                    context.commit('setComments', [...allComments, {
                        name: json.name,
                        id: allComments.length + 1,
                        body: json.body,
                        email: json.email,
                        postId: postId
                    }]);
                });
        },
        async pushPost(context, { title, body }) {
            fetch(`https://jsonplaceholder.typicode.com/posts`, {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: body,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then((json) => {
                    const allPosts = context.getters.getPosts;
                    context.commit('setPosts', [...allPosts, {
                        title: json.title,
                        id: allPosts.length + 1,
                        body: json.body,
                    }]);
                });
        },
        async deletePost(context, { postId }) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'DELETE'
            }).then(() => {
                const posts = [...context.getters.getPosts];
                posts.splice(postId - 1, 1);
                context.commit('setPosts', posts);
                console.log(context.getters.getPosts);
            });
        },
        async deleteComment(context, { commentId }) {
            fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
                method: 'DELETE'
            }).then(() => {
                const comments = [...context.getters.getAllComments];
                comments.splice(commentId - 1, 1);
                context.commit('setComments', comments);
            });
        },
        async editComment(context, { name, email, body, id, postId }) {
            const theComment = {
                id: id,
                name: name,
                body: body,
                email: email,
                postId: postId
            };
            fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
                method: 'PUT',
                body: JSON.stringify(theComment),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then(() => {
                    const allComments = [...context.getters.getAllComments];
                    allComments[id - 1] = theComment;
                    context.commit('setComments', allComments);
                });
        },
        async editPost(context, { title, body, id, userId }) {
            const thePost = {
                title: title,
                body: body,
                id: id,
                userId: userId
            };
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify(thePost),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then(() => {
                    const posts = [...context.getters.getPosts];
                    posts[id - 1] = thePost;
                    context.commit('setPosts', posts);
                });
        },
    },
});
