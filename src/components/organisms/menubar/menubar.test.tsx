import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "./menubar"

describe("Menubar", () => {
  it("renders triggers", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    expect(screen.getByRole("menuitem", { name: "File" })).toBeInTheDocument()
  })

  it("opens menu content when a trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )

    await user.click(screen.getByRole("menuitem", { name: "File" }))

    expect(await screen.findByRole("menuitem", { name: "New Tab" })).toBeInTheDocument()
  })
})
