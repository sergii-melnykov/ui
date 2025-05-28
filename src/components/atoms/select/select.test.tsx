import { render, screen, fireEvent } from "@testing-library/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "./select"

describe("Select", () => {
  it("renders select trigger with placeholder", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    expect(screen.getByText("Select an option")).toBeInTheDocument()
  })

  it("opens select content when trigger is clicked", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    fireEvent.click(screen.getByRole("combobox"))
    expect(screen.getByText("Apple")).toBeInTheDocument()
  })

  it("selects an option when clicked", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    fireEvent.click(screen.getByRole("combobox"))
    fireEvent.click(screen.getByText("Apple"))
    expect(screen.getByText("Apple")).toBeInTheDocument()
  })

  it("renders disabled select", () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    )

    expect(screen.getByRole("combobox")).toBeDisabled()
  })
})
