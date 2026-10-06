import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import * as React from "react"

import { Calendar } from "./calendar"

describe("Calendar", () => {
  it("renders with calendar root slot", () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 2, 1)} />)
    expect(document.querySelector('[data-slot="calendar"]')).toBeInTheDocument()
  })

  it("applies size variant cell spacing", () => {
    const { rerender } = render(
      <Calendar mode="single" size="sm" defaultMonth={new Date(2026, 2, 1)} />
    )
    expect(document.querySelector('[data-slot="calendar"]')).toHaveClass("[--cell-size:1.75rem]")

    rerender(<Calendar mode="single" size="lg" defaultMonth={new Date(2026, 2, 1)} />)
    expect(document.querySelector('[data-slot="calendar"]')).toHaveClass("[--cell-size:3rem]")
  })

  it("selects a day in single mode", async () => {
    const user = userEvent.setup()
    function ControlledCalendar() {
      const [date, setDate] = React.useState<Date | undefined>()
      return (
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2026, 2, 1)}
        />
      )
    }

    render(<ControlledCalendar />)
    const day15 = screen.getByRole("button", { name: "Sunday, March 15th, 2026" })
    await user.click(day15)
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Sunday, March 15th, 2026/ })
      ).toHaveAttribute("data-selected-single")
    })
  })
})
