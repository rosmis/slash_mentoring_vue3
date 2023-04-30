import { nextTick } from "vue";

export function useScrollToPosition(wrapper: HTMLDivElement) {
    return nextTick(() => {
        window.scrollTo({
            top: wrapper.scrollHeight,
            behavior: "smooth",
        });
    });
}
