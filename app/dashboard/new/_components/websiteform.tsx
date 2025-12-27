"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { GlobeIcon, PlusIcon, Copy, Check } from 'lucide-react'
import { createWebsite } from '@/app/actions/website'

function websiteform() {
  const router = useRouter()
  const [domain, setDomain] = useState<string>("")
  const [timezone, setTimezone] = useState<string>("")
  const [enableLocalhostTracking, setEnableLocalhostTracking] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<{ websiteId: string; domain: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [appUrl, setAppUrl] = useState("http://localhost:3000")

  useEffect(() => {
    // Get the current app URL
    if (typeof window !== 'undefined') {
      setAppUrl(`${window.location.protocol}//${window.location.host}`)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess(null)

    if (!domain.trim()) {
      setError("Domain is required")
      return
    }

    if (!timezone) {
      setError("Timezone is required")
      return
    }

    setIsLoading(true)

    try {
      const result = await createWebsite({
        domain,
        timezone,
        enableLocalhostTracking,
      })

      if (result.success && result.data) {
        setSuccess({
          websiteId: result.data.websiteId,
          domain: domain
        })
        // Reset form
        setDomain("")
        setTimezone("")
        setEnableLocalhostTracking(false)
      } else {
        setError(result.error || "Failed to create website")
      }
    } catch (err) {
      setError("An error occurred while creating the website")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const scriptTag = success ? `<script
  defer
  data-website-id="${success.websiteId}"
  data-domain="${success.domain}"
  src="${appUrl}/analytics.js">
</script>` : ""

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(scriptTag)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Add a new Website</h1>
      
      {/* Success Message with Script Tag */}
      {success && (
        <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">✓ Website Created Successfully!</h2>
            <p className="text-green-800 dark:text-green-200 mb-4">Copy the script below and paste it into your website's &lt;head&gt; section:</p>
          </div>
          
          {/* Script tag display */}
          <div className="relative mb-4">
            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono text-sm leading-6 border border-slate-700">
              {scriptTag}
            </pre>
            <button
              onClick={handleCopyScript}
              className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-slate-300" />
              )}
            </button>
          </div>

          {copied && (
            <div className="text-green-800 dark:text-green-200 text-sm mb-4">
              ✓ Script copied to clipboard!
            </div>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={() => setSuccess(null)}
              variant="outline"
              className="flex-1"
            >
              Add Another Website
            </Button>
            <Button 
              onClick={() => router.push("/dashboard")}
              className="flex-1"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}

      {/* Form */}
      {!success && (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="domain-input">Domain</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <GlobeIcon className="size-5" />
                  <span>https://</span>
                </InputGroupAddon>
                <InputGroupInput
                  id="domain-input"
                  type="text"
                  placeholder="mywebsite.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                />
              </InputGroup>
            </Field>
            
            <Field>
              <FieldLabel htmlFor="timezone-select">Timezone</FieldLabel>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone-select">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
                  <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                  <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            
            <Field>
              <FieldContent>
                <label
                  htmlFor="localhost-checkbox"
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    id="localhost-checkbox"
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={enableLocalhostTracking}
                    onChange={(e) => setEnableLocalhostTracking(e.target.checked)}
                  />
                  <span>Enable Localhost Tracking for Development</span>
                </label>
              </FieldContent>
            </Field>
          </FieldGroup>
          
          <Button className="w-full" size="lg" disabled={isLoading}>
            <PlusIcon className="size-5 mr-2" />
            {isLoading ? "Adding Website..." : "Add Website"}
          </Button>
        </form>
      )}
    </div>
  )
}

export default websiteform
