import { render, screen } from "@testing-library/react"
import * as React from "react"

import {
  DatePicker,
  DatePickerButton,
  DatePickerContent,
  DatePickerTrigger
} from "./date-picker"

describe("DatePicker", () => {
  it("renders trigger with placeholder when empty", () => {
    render(
      <DatePicker>
        <DatePickerTrigger asChild>
          <DatePickerButton date={undefined} />
        </DatePickerTrigger>
        <DatePickerContent>
          <div>Calendar</div>
        </DatePickerContent>
      </DatePicker>
    )

    expect(screen.getByRole("button", { name: /pick a date/i })).toBeInTheDocument()
  })

  it("renders formatted date on the trigger button", () => {
    render(
      <DatePickerButton date={new Date(2026, 0, 20)} dateFormat="LLL dd, y" />
    )

    expect(screen.getByRole("button", { name: /jan 20, 2026/i })).toBeInTheDocument()
  })

  it("supports hiding the calendar icon", () => {
    render(<DatePickerButton date={undefined} showIcon={false} />)
    expect(document.querySelector('[data-slot="date-picker-button"] svg')).not.toBeInTheDocument()
  })
})
