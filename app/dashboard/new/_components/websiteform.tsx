"use client"

import React, { useState } from 'react'
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { GlobeIcon, PlusIcon } from 'lucide-react'

function websiteform() {
  const [timezone, setTimezone] = useState<string>("")

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Add a new Website</h1>
      <form className="space-y-6">
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
                />
                <span>Enable Localhost Tracking for Development</span>
              </label>
            </FieldContent>
          </Field>
        </FieldGroup>
        
        <Button className="w-full" size="lg">
          <PlusIcon className="size-5 mr-2" />
          Add Website
        </Button>
      </form>
    </div>
  )
}

export default websiteform
