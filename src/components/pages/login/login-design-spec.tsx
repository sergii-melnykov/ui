/**
 * Storybook-only layout mirroring the Figma Login blocks documentation page.
 * Not exported from the library package.
 */

import * as React from "react"
import { ArrowUpRight, GalleryVerticalEnd } from "lucide-react"

import { Button } from "@/components/atoms/button/button"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/atoms/field/field"
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

function BrandIcon({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="size-4 shrink-0" />
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

function EmailPasswordFields({
  idPrefix,
  inputClassName
}: {
  idPrefix: string
  inputClassName?: string
}) {
  return (
    <FieldGroup className="gap-7">
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-email`}>Email</FieldLabel>
        <Input
          id={`${idPrefix}-email`}
          type="email"
          placeholder="m@example.com"
          className={cn("w-full max-w-[320px]", inputClassName)}
        />
      </Field>
      <Field>
        <div className="flex w-full max-w-[320px] items-center justify-between gap-2">
          <FieldLabel htmlFor={`${idPrefix}-password`}>Password</FieldLabel>
          <Button variant="link" className="h-auto px-0 text-sm font-normal">
            Forgot password?
          </Button>
        </div>
        <Input
          id={`${idPrefix}-password`}
          type="password"
          className={cn("w-full max-w-[320px]", inputClassName)}
        />
      </Field>
    </FieldGroup>
  )
}

function OrContinueWith({ className }: { className?: string }) {
  return (
    <FieldSeparator className={cn("my-0 h-5 w-full", className)}>
      <span className="bg-inherit text-xs uppercase tracking-normal">Or continue with</span>
    </FieldSeparator>
  )
}

function SignUpText({ className, tone = "muted" }: { className?: string; tone?: "muted" | "foreground" }) {
  return (
    <p
      className={cn(
        "text-center text-sm",
        tone === "muted" ? "text-muted-foreground" : "text-card-foreground",
        className
      )}
    >
      Don&apos;t have an account?{" "}
      <button type="button" className="underline underline-offset-4">
        Sign up
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

function SimpleLoginCardBlock() {
  return (
    <BlockPreview>
      <div className="flex flex-1 flex-col items-center justify-center">
        <Card className="w-full max-w-[368px] shadow-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <EmailPasswordFields idPrefix="simple-card" />
            <div className="flex flex-col gap-3 pt-7">
              <Button className="w-full">Login</Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
              <SignUpText />
            </div>
          </CardContent>
        </Card>
      </div>
    </BlockPreview>
  )
}

function SplitLoginWithImageBlock() {
  return (
    <BlockPreview className="border-0 p-0">
      <Card className="flex w-full flex-col overflow-hidden lg:flex-row">
        <div className="flex flex-1 flex-col gap-6 p-10">
          <AcmeBrand />
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <div className="flex w-full max-w-[320px] flex-col gap-2 text-center">
              <h2 className="text-2xl font-semibold leading-8 text-card-foreground">
                Login to your account
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="w-full max-w-[320px]">
              <EmailPasswordFields idPrefix="split-login" inputClassName="max-w-none" />
              <Button className="mt-7 w-full">Login</Button>
              <OrContinueWith className="mt-6 [&_[data-slot=field-separator-content]]:bg-card" />
              <Button variant="outline" className="mt-4 w-full">
                <BrandIcon src={iconGithub} alt="GitHub" />
                Github
              </Button>
              <SignUpText tone="foreground" className="mt-6" />
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

function MutedWelcomeBackBlock() {
  return (
    <BlockPreview muted>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-[384px] flex-col items-center gap-6">
          <AcmeBrand />
          <Card className="w-full shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl leading-7">Welcome back</CardTitle>
              <CardDescription>Login with your Apple or Google account</CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full">
                    <BrandIcon src={iconApple} alt="Apple" />
                    Login with Apple
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BrandIcon src={iconGoogle} alt="Google" />
                    Login with Google
                  </Button>
                </div>
                <OrContinueWith className="[&_[data-slot=field-separator-content]]:bg-card" />
                <EmailPasswordFields idPrefix="muted-welcome" inputClassName="max-w-none" />
                <Button className="w-full">Login</Button>
              </div>
              <SignUpText tone="foreground" className="mt-6" />
            </CardContent>
          </Card>
          <TermsFooter />
        </div>
      </div>
    </BlockPreview>
  )
}

function FormWithImageCardBlock() {
  return (
    <BlockPreview muted>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-[895px] flex-col items-center gap-6">
          <Card className="flex w-full flex-col overflow-hidden lg:flex-row lg:items-stretch">
            <CardContent className="flex flex-1 flex-col gap-6 px-6 py-6">
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-2xl font-medium leading-8 text-card-foreground">Welcome back</h2>
                <p className="text-base text-muted-foreground">
                  Login with your Apple or Google account
                </p>
              </div>
              <EmailPasswordFields idPrefix="form-image" inputClassName="max-w-none" />
              <Button className="w-full">Login</Button>
              <OrContinueWith className="[&_[data-slot=field-separator-content]]:bg-card" />
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="size-9 shrink-0">
                  <BrandIcon src={iconAppleSm} alt="Apple" />
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button variant="outline" size="icon" className="size-9 shrink-0">
                  <BrandIcon src={iconGoogleSm} alt="Google" />
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" size="icon" className="size-9 shrink-0">
                  <BrandIcon src={iconMeta} alt="Meta" />
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div>
              <SignUpText />
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

function CenteredAcmeBlock() {
  return (
    <BlockPreview>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-[384px] flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-7">
            <div className="flex flex-col items-center gap-2 text-center">
              <GalleryVerticalEnd className="size-6 text-sidebar-foreground" aria-hidden />
              <h2 className="text-xl font-semibold leading-7 text-sidebar-foreground">
                Welcome to Acme Inc.
              </h2>
              <SignUpText />
            </div>
            <div className="flex w-full flex-col gap-6">
              <Field>
                <FieldLabel htmlFor="centered-acme-email">Email</FieldLabel>
                <Input id="centered-acme-email" type="email" placeholder="m@example.com" />
              </Field>
              <Button className="w-full">Login</Button>
            </div>
            <OrContinueWith className="w-full" />
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <Button variant="outline" className="w-full">
                <BrandIcon src={iconApple} alt="Apple" />
                Login with Apple
              </Button>
              <Button variant="outline" className="w-full">
                <BrandIcon src={iconGoogle} alt="Google" />
                Login with Google
              </Button>
            </div>
          </div>
          <TermsFooter />
        </div>
      </div>
    </BlockPreview>
  )
}

export function LoginDesignSpec() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 rounded-3xl border border-border bg-background p-8 sm:p-14">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-semibold leading-10 text-foreground">Login</h1>
        <Button variant="outline" className="h-8 shrink-0 rounded-xl px-3 shadow-xs" asChild>
          <a href="https://ui.shadcn.com/blocks/login" target="_blank" rel="noreferrer">
            View in Shadcn
            <ArrowUpRight className="size-4" />
          </a>
        </Button>
      </header>

      <SimpleLoginCardBlock />

      <Separator />

      <SplitLoginWithImageBlock />

      <Separator />

      <MutedWelcomeBackBlock />

      <Separator />

      <FormWithImageCardBlock />

      <Separator />

      <CenteredAcmeBlock />
    </div>
  )
}
