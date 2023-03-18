<template>
    <div class="skew-container skew top-0 right-0 bottom-0 w-20 absolute">
        <div class="h-full skew"></div>
    </div>
</template>

<style scoped>
.skew-container {
    transform: skewY(-11deg) translateY(-10%);
    background-color: red;
}
.skew {
    transform: skewY(11deg);
}
</style>
