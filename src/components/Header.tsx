import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"

export default function Header() {
  const { t } = useTranslation("common")
  const { data: session } = useSession()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm" role="banner">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 dark:text-white"
                aria-label="Home"
              >
                {t("appName")}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`${
                  router.pathname === "/"
                    ? "border-indigo-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                aria-current={router.pathname === "/" ? "page" : undefined}
              >
                {t("home")}
              </Link>
              <Link
                href="/dashboard"
                className={`${
                  router.pathname === "/dashboard"
                    ? "border-indigo-500 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                aria-current={router.pathname === "/dashboard" ? "page" : undefined}
              >
                {t("dashboard")}
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mounted &&
                (theme === "dark" ? (
                  <SunIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <MoonIcon className="h-5 w-5" aria-hidden="true" />
                ))}
            </button>
            {session ? (
              <div className="relative" role="group" aria-label="User menu">
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Sign out"
                >
                  {t("signOut")}
                </button>
              </div>
            ) : (
              <div className="flex space-x-4" role="group" aria-label="Authentication options">
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Sign in"
                >
                  {t("signIn")}
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-label="Sign up"
                >
                  {t("signUp")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
