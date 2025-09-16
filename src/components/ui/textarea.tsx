import * as React from "react"

import {cn} from "@/lib/utils"

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<"textarea">
>(({className, ...props}, ref) => {
    return (
        <textarea
            className={cn(
                "flex min-h-[60px] w-full font-bold " +
                "rounded-md border active:bg-white focus:border-blue-500  " +
                "border-2 border-transparent bg-[#f6f7fb] px-3 py-[1.7em] text-base shadow-none transition-all duration-300  " +
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed " +
                "disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:placeholder:text-neutral-400 ",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = "Textarea"

export {Textarea}
