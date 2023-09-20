import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

export function useMobileBreakpoint(breakpoint: "sm" | "md" | "lg" | "xl") {
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isMobile = breakpoints.smaller(breakpoint);

    return isMobile;
}
