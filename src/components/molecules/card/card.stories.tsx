import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "@/components/atoms/badge/badge"
import { Button } from "@/components/atoms/button/button"
import { Field, FieldGroup, FieldLabel } from "@/components/atoms/field/field"
import { Input } from "@/components/atoms/input/input"

import { CardDesignSpec } from "./card-design-spec"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./card"

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" }
}

export default meta
type Story = StoryObj<typeof Card>

export const DesignSpec: Story = {
  render: () => <CardDesignSpec />,
  parameters: {
    layout: "fullscreen",
    docs: {
      disable: true
    }
  }
}

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm" className="h-8 px-2.5 shadow-none">
            Sign up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-6">
          <Field>
            <FieldLabel htmlFor="card-email">Email</FieldLabel>
            <Input id="card-email" type="email" placeholder="m@example.com" />
          </Field>
          <Field>
            <FieldLabel htmlFor="card-password">Password</FieldLabel>
            <Input id="card-password" type="password" />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Login</Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}

export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-full max-w-sm overflow-hidden">
      <CardHeader>
        <CardTitle>Small card</CardTitle>
        <CardDescription>This card uses the small size variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-card-foreground">
          The card component supports a size prop that can be set to &quot;sm&quot; for a more compact
          appearance.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  )
}

export const WithImage: Story = {
  render: () => (
    <Card className="w-full max-w-sm overflow-hidden pt-0">
      <img src="/card/meetup-header.png" alt="" className="h-[216px] w-full object-cover" />
      <CardHeader className="pt-4">
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping faster.
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View event</Button>
      </CardFooter>
    </Card>
  )
}
