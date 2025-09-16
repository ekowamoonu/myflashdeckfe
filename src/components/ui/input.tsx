import * as React from "react";

import {cn} from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({className, type, ...props}, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-9 w-full font-bold " +
                    "active:bg-white focus:border-blue-500  " +
                    "rounded-md border-2 border-transparent bg-[#f6f7fb] " +
                    "px-3 py-[1.7em] text-base shadow-none transition-all duration-300 " +
                    "file:border-0 file:bg-transparent file:text-sm file:font-medium " +
                    "file:text-neutral-950 placeholder:text-gray-700 placeholder:opacity-50 focus-visible:outline-none  " +
                    " disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
                    "dark:border-neutral-800 dark:file:text-neutral-50 " +
                    "dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export {Input};
