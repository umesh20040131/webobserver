"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { GlobeIcon, PlusIcon } from 'lucide-react'
import { createWebsite } from '@/app/actions/website'

function websiteform() {
  const router = useRouter()
  const [domain, setDomain] = useState<string>("")
  const [timezone, setTimezone] = useState<string>("")
  const [enableLocalhostTracking, setEnableLocalhostTracking] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

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

      if (result.success) {
        router.push("/dashboard")
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

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Add a new Website</h1>
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
    </div>
  )
}

export default websiteform
