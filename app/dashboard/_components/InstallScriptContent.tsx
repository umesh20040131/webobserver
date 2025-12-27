"use client"

import { useState } from "react"
import { ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface InstallScriptPageProps {
  websiteId: string
  domain: string
}

export function InstallScriptContent({ websiteId, domain }: InstallScriptPageProps) {
  const [copied, setCopied] = useState(false)
  
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const scriptTag = `<script
  defer
  data-website-id="${websiteId}"
  data-domain="${domain}"
  src="${appUrl}/analytics.js">
</script>`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(scriptTag)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
        </Link>

        {/* Main content */}
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Install the WebTrack Script</h1>
          <p className="text-muted-foreground mb-8">
            Copy and paste the following script into the &lt;head&gt; section of your website's HTML.
          </p>

          {/* Website info */}
          <div className="bg-muted p-4 rounded-lg mb-8">
            <p className="text-sm text-muted-foreground mb-1">Website Domain</p>
            <p className="text-lg font-semibold text-foreground">{domain}</p>
          </div>

          {/* Script tag display */}
          <div className="relative mb-8">
            <pre className="bg-slate-900 text-green-400 p-6 rounded-lg overflow-x-auto font-mono text-sm leading-6">
              {scriptTag}
            </pre>
            <button
              onClick={handleCopy}
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

          {/* Copy confirmation */}
          {copied && (
            <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded mb-8">
              ✓ Script copied to clipboard!
            </div>
          )}

          {/* Instructions */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-foreground">Installation Steps:</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Copy the script tag above (click the copy button)</li>
              <li>Open your website's HTML file</li>
              <li>Paste the script in the &lt;head&gt; section (before &lt;/head&gt;)</li>
              <li>Save and reload your website</li>
              <li>Analytics will start tracking automatically</li>
            </ol>
          </div>

          {/* Custom events section */}
          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Custom Event Tracking (Optional)</h2>
            <p className="text-muted-foreground mb-4">
              Use this to track custom events on your website:
            </p>
            <pre className="bg-slate-900 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
{`WebObserver.track('event_name', {
  customData: 'value',
  timestamp: new Date().toISOString()
});`}
            </pre>
          </div>

          {/* Confirmation button */}
          <Link href="/dashboard">
            <Button className="w-full py-6 text-base">
              Ok, I've installed the script
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
