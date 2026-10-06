import type * as React from "react"

export type MessageAlign = "start" | "end"

export type MessageProps = React.ComponentProps<"div"> & {
  align?: MessageAlign
}
