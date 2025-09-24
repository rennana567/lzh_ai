import type { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
    return (
        <div
          className="border-1 border-[#000] min-h-100 p-20"
        >
            {children}
        </div>
    )
}

export default Container;