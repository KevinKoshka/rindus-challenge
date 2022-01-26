<template>
    <div class="home">
        <PostDisplay />
        <CommentDisplay />
    </div>
</template>

<script>
// @ is an alias to /src
import PostDisplay from '@/components/PostDisplay.vue';
import CommentDisplay from '@/components/CommentDisplay.vue';

export default {
    name: 'Home',
    components: {
        PostDisplay,
        CommentDisplay
    }    
};
</script>

<style>
    html {
        font-size: 13px;
    }
    .divider {
        border-bottom: 1px solid gray;
        width: 60vw;
        margin: auto;
    }
    .button-panel {
        display: flex;
        justify-content: space-between;
    }
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) { 
        html {
            font-size: 14px;
        }
        .divider {
            width: 100%;
        }
    }
</style>
