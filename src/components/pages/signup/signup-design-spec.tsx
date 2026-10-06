/**
 * Storybook-only layout mirroring the Figma Signup blocks documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, GalleryVerticalEnd } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from "@/components/atoms/field/field"
import { Input } from "@/components/atoms/input/input"
import { Separator } from "@/components/atoms/separator/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/molecules/card/card"
import { cn } from "@/utils/index"

const placeholderImage = "/login-blocks/placeholder.png"
const iconApple = "/login-blocks/icon-apple.svg"
const iconAppleSm = "/login-blocks/icon-apple-sm.svg"
const iconGithub = "/login-blocks/icon-github.svg"
const iconGoogle = "/login-blocks/icon-google.svg"
const iconGoogleSm = "/login-blocks/icon-google-sm.svg"
const iconMeta = "/login-blocks/icon-meta.svg"

const EMAIL_HELPER =
  "We'll use this to contact you. We will not share your email with anyone else."
const PASSWORD_HELPER = "Must be at least 8 characters long."

function BlockPreview({
  children,
  className,
  muted = false
}: {
  children: React.ReactNode
  className?: string
  muted?: boolean
}) {
  return (
    <div
      className={cn(
        "flex min-h-[640px] w-full items-stretch overflow-hidden rounded-xl border border-border px-10 py-10 lg:min-h-[930px]",
        muted ? "bg-muted" : "bg-background",
        className
      )}
    >
      {children}
    </div>
  )
}

function BrandIcon({ src }: { src: string }) {
  return <img src={src} alt="" aria-hidden className="size-4 shrink-0" />
}

function AcmeBrand({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <span className="text-sm font-medium text-sidebar-foreground">Acme Inc</span>
    </div>
  )
}

function OrContinueWith({ className }: { className?: string }) {
  return (
    <FieldSeparator className={cn("my-0 h-5 w-full", className)}>
      <span className="bg-inherit text-xs uppercase tracking-normal">Or continue with</span>
    </FieldSeparator>
  )
}

function SignInText({ className, tone = "muted" }: { className?: string; tone?: "muted" | "foreground" }) {
  return (
    <p
      className={cn(
        "text-center text-sm",
        tone === "muted" ? "text-muted-foreground" : "text-card-foreground",
        className
      )}
    >
      Already have an account?{" "}
      <button type="button" className="underline underline-offset-4">
        Sign in
      </button>
    </p>
  )
}

function TermsFooter({ className }: { className?: string }) {
  return (
    <p className={cn("max-w-[229px] text-center text-xs leading-4 text-muted-foreground", className)}>
      By clicking continue, you agree to our{" "}
      <a href="https://ui.shadcn.com/terms" className="underline underline-offset-4">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="https://ui.shadcn.com/privacy" className="underline underline-offset-4">
        Privacy Policy
      </a>
      .
    </p>
  )
}

function ImagePlaceholder({ size = "lg" }: { size?: "lg" | "sm" }) {
  const dimension = size === "lg" ? "size-[min(400px,50vw)]" : "size-[150px]"
  return (
    <div className={cn("relative shrink-0", dimension)}>
      <img
        src={placeholderImage}
        alt=""
        className="pointer-events-none size-full object-cover"
      />
    </div>
  )
}

function FullSignupFields({
  idPrefix,
  inputClassName,
  passwordLayout = "stacked",
  showEmailHelper = false,
  showPasswordHelpers = true
}: {
  idPrefix: string
  inputClassName?: string
  passwordLayout?: "stacked" | "row"
  showEmailHelper?: boolean
  showPasswordHelpers?: boolean
}) {
  return (
    <FieldGroup className="gap-7">
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-name`}>Full Name</FieldLabel>
        <Input
          id={`${idPrefix}-name`}
          placeholder="John Doe"
          className={cn("w-full max-w-[320px]", inputClassName)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-email`}>Email</FieldLabel>
        <Input
          id={`${idPrefix}-email`}
          type="email"
          placeholder="m@example.com"
          className={cn("w-full", inputClassName)}
        />
        {showEmailHelper ? <FieldDescription>{EMAIL_HELPER}</FieldDescription> : null}
      </Field>
      {passwordLayout === "stacked" ? (
        <>
          <Field>
            <FieldLabel htmlFor={`${idPrefix}-password`}>Password</FieldLabel>
            <Input
              id={`${idPrefix}-password`}
              type="password"
              className={cn("w-full", inputClassName)}
            />
            {showPasswordHelpers ? (
              <FieldDescription>{PASSWORD_HELPER}</FieldDescription>
            ) : null}
          </Field>
          <Field>
            <FieldLabel htmlFor={`${idPrefix}-confirm`}>Confirm Password</FieldLabel>
            <Input
              id={`${idPrefix}-confirm`}
              type="password"
              className={cn("w-full", inputClassName)}
            />
            {showPasswordHelpers ? (
              <FieldDescription>{PASSWORD_HELPER}</FieldDescription>
            ) : null}
          </Field>
        </>
      ) : (
        <div className="flex w-full flex-col gap-3">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`${idPrefix}-password`}>Password</FieldLabel>
              <Input id={`${idPrefix}-password`} type="password" className={cn("w-full", inputClassName)} />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${idPrefix}-confirm`}>Confirm Password</FieldLabel>
              <Input id={`${idPrefix}-confirm`} type="password" className={cn("w-full", inputClassName)} />
            </Field>
          </div>
          {showPasswordHelpers ? (
            <FieldDescription>{PASSWORD_HELPER}</FieldDescription>
          ) : null}
        </div>
      )}
    </FieldGroup>
  )
}

function SimpleSignupCardBlock() {
  return (
    <BlockPreview>
      <div className="flex flex-1 flex-col items-center justify-center">
        <Card className="w-full max-w-sm gap-6 py-6 shadow-sm">
          <CardHeader className="px-6">
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your information below to create your account.</CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <FullSignupFields idPrefix="simple-signup" showEmailHelper />
            <div className="flex flex-col gap-3 pt-7">
              <Button className="h-9 w-full">Create Account</Button>
              <Button variant="outline" className="h-9 w-full">
                Sign up with Google
              </Button>
              <SignInText />
            </div>
          </CardContent>
        </Card>
      </div>
    </BlockPreview>
  )
}

function SplitSignupWithCoverBlock() {
  return (
    <BlockPreview className="border-0 p-0">
      <Card className="flex w-full flex-col overflow-hidden lg:flex-row">
        <div className="flex flex-1 flex-col gap-6 p-10">
          <AcmeBrand />
          <div className="flex flex-1 flex-col items-center justify-center gap-7">
            <div className="flex w-full max-w-[320px] flex-col gap-2 text-center">
              <h2 className="text-2xl font-bold leading-8 text-card-foreground">Create an account</h2>
              <p className="text-sm text-muted-foreground">
                Fill in the form below to create your account.
              </p>
            </div>
            <div className="w-full max-w-[320px]">
              <FullSignupFields
                idPrefix="split-signup"
                inputClassName="max-w-none"
                showEmailHelper
                showPasswordHelpers
              />
              <Button className="mt-7 h-9 w-full">Create Account</Button>
              <OrContinueWith className="mt-6 [&_[data-slot=field-separator-content]]:bg-card" />
              <Button variant="outline" className="mt-4 h-9 w-full">
                <BrandIcon src={iconGithub} />
                Github
              </Button>
              <SignInText tone="foreground" className="mt-6" />
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-muted p-8">
          <ImagePlaceholder size="lg" />
        </div>
      </Card>
    </BlockPreview>
  )
}

function MutedSignupCardBlock() {
  return (
    <BlockPreview muted>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          <AcmeBrand />
          <Card className="w-full gap-6 py-6 shadow-sm">
            <CardHeader className="px-6 text-center">
              <CardTitle className="text-xl leading-7">Create your account</CardTitle>
              <CardDescription>Enter your email below to create your account</CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <FullSignupFields
                idPrefix="muted-signup"
                inputClassName="max-w-none"
                passwordLayout="row"
                showPasswordHelpers
              />
              <div className="flex flex-col gap-3 pt-7">
                <Button className="h-9 w-full">Create Account</Button>
                <SignInText tone="foreground" />
              </div>
            </CardContent>
          </Card>
          <TermsFooter />
        </div>
      </div>
    </BlockPreview>
  )
}

function FormWithImageSignupBlock() {
  return (
    <BlockPreview muted>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-[895px] flex-col items-center gap-6">
          <Card className="flex w-full flex-col overflow-hidden lg:flex-row lg:items-stretch">
            <CardContent className="flex flex-1 flex-col gap-6 px-8 py-8">
              <div className="flex flex-col gap-2 px-6 text-center">
                <h2 className="text-2xl font-semibold leading-8 text-card-foreground">
                  Create Your Account
                </h2>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <div className="px-6">
                <FieldGroup className="gap-7">
                  <Field>
                    <FieldLabel htmlFor="form-image-email">Email</FieldLabel>
                    <Input id="form-image-email" type="email" placeholder="m@example.com" />
                    <FieldDescription>{EMAIL_HELPER}</FieldDescription>
                  </Field>
                  <div className="flex w-full flex-col gap-3">
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel htmlFor="form-image-password">Password</FieldLabel>
                        <Input id="form-image-password" type="password" />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="form-image-confirm">Confirm Password</FieldLabel>
                        <Input id="form-image-confirm" type="password" />
                      </Field>
                    </div>
                    <FieldDescription>{PASSWORD_HELPER}</FieldDescription>
                  </div>
                </FieldGroup>
                <Button className="mt-7 h-9 w-full">Create Account</Button>
                <OrContinueWith className="mt-6 [&_[data-slot=field-separator-content]]:bg-card" />
                <div className="mt-4 flex gap-4">
                  <Button variant="outline" size="icon" className="size-9 shrink-0">
                    <BrandIcon src={iconAppleSm} />
                    <span className="sr-only">Sign up with Apple</span>
                  </Button>
                  <Button variant="outline" size="icon" className="size-9 shrink-0">
                    <BrandIcon src={iconGoogleSm} />
                    <span className="sr-only">Sign up with Google</span>
                  </Button>
                  <Button variant="outline" size="icon" className="size-9 shrink-0">
                    <BrandIcon src={iconMeta} />
                    <span className="sr-only">Sign up with Meta</span>
                  </Button>
                </div>
                <SignInText className="mt-6" />
              </div>
            </CardContent>
            <div className="flex flex-1 items-center justify-center bg-muted p-8">
              <ImagePlaceholder size="sm" />
            </div>
          </Card>
          <TermsFooter />
        </div>
      </div>
    </BlockPreview>
  )
}

function CenteredAcmeSignupBlock() {
  return (
    <BlockPreview>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-7">
            <div className="flex flex-col items-center gap-2 text-center">
              <GalleryVerticalEnd className="size-6 text-sidebar-foreground" aria-hidden />
              <h2 className="text-xl font-semibold leading-7 text-sidebar-foreground">
                Welcome to Acme Inc.
              </h2>
              <SignInText />
            </div>
            <div className="flex w-full flex-col gap-6">
              <Field>
                <FieldLabel htmlFor="centered-signup-email">Email</FieldLabel>
                <Input id="centered-signup-email" type="email" placeholder="m@example.com" />
              </Field>
              <Button className="h-9 w-full">Create Account</Button>
            </div>
            <OrContinueWith className="w-full" />
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <Button variant="outline" className="h-9 w-full">
                <BrandIcon src={iconApple} />
                Continue with Apple
              </Button>
              <Button variant="outline" className="h-9 w-full">
                <BrandIcon src={iconGoogle} />
                Continue with Google
              </Button>
            </div>
          </div>
          <TermsFooter />
        </div>
      </div>
    </BlockPreview>
  )
}

export function SignupDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 rounded-3xl border border-border bg-background p-8 sm:p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold leading-10 text-foreground">Signup</h1>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl px-3 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/blocks/signup" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <SimpleSignupCardBlock />

      <Separator />

      <SplitSignupWithCoverBlock />

      <Separator />

      <MutedSignupCardBlock />

      <Separator />

      <FormWithImageSignupBlock />

      <Separator />

      <CenteredAcmeSignupBlock />
    </div>
  )
}
