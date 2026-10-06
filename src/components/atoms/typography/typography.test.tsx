import { render, screen } from "@testing-library/react"

import {
  Typography,
  TypographyTable,
  TypographyTableCell,
  TypographyTableHead,
  TypographyTableRow
} from "./index"

describe("Typography", () => {
  it("renders paragraph text by default", () => {
    render(<Typography>Body copy</Typography>)
    const text = screen.getByText("Body copy")
    expect(text.tagName).toBe("P")
  })

  it("maps heading variants to semantic heading elements", () => {
    render(<Typography variant="h1">Title</Typography>)
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument()
  })

  it("maps blockquote variant to blockquote element", () => {
    render(<Typography variant="blockquote">Quoted text</Typography>)
    const quote = screen.getByText("Quoted text")
    expect(quote.tagName).toBe("BLOCKQUOTE")
  })

  it("maps list variant to ul element", () => {
    render(
      <Typography variant="list">
        <li>List item</li>
      </Typography>
    )
    expect(screen.getByRole("list")).toBeInTheDocument()
  })

  it("maps inline-code variant to code element", () => {
    render(<Typography variant="inline-code">npm install</Typography>)
    const code = screen.getByText("npm install")
    expect(code.tagName).toBe("CODE")
  })

  it("allows overriding the semantic element with as", () => {
    render(
      <Typography variant="h1" as="p">
        Styled like h1
      </Typography>
    )
    const text = screen.getByText("Styled like h1")
    expect(text.tagName).toBe("P")
    expect(text).toHaveClass("text-4xl")
  })

  it("applies custom className", () => {
    render(
      <Typography variant="muted" className="custom-class">
        Muted
      </Typography>
    )
    expect(screen.getByText("Muted")).toHaveClass("custom-class")
  })
})

describe("TypographyTable", () => {
  it("renders table with styled cells", () => {
    render(
      <TypographyTable>
        <tbody>
          <TypographyTableRow>
            <TypographyTableHead scope="row">Label</TypographyTableHead>
            <TypographyTableCell>Value</TypographyTableCell>
          </TypographyTableRow>
        </tbody>
      </TypographyTable>
    )

    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.getByText("Label")).toHaveClass("font-bold")
    expect(screen.getByText("Value")).toHaveClass("border")
  })
})
