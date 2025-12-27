"use client"

import { useState, useEffect } from "react"
import { Copy, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  websiteId: string
  domain: string
}

export function InstallScriptModal({
  isOpen,
  onClose,
  websiteId,
  domain,
}: ModalProps) {
  const [copied, setCopied] = useState(false)
  const [scriptContent, setScriptContent] = useState("")

  useEffect(() => {
    // Generate script on client side
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.protocol}//${window.location.host}`
      : "http://localhost:3000"
    
    const script = `<script
  defer
  data-website-id="${websiteId}"
  data-domain="${domain}"
  src="${baseUrl}/analytics.js">
</script>`
    
    setScriptContent(script)
  }, [websiteId, domain])

  if (!isOpen) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-950 rounded-lg shadow-xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-slate-700 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Install the WebTrack Script</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Instructions */}
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              Copy and paste the following script into the &lt;head&gt; section of your website's HTML.
            </p>
          </div>

          {/* Website info */}
          <div className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Website Domain</p>
            <p className="text-lg font-semibold">{domain}</p>
          </div>

          {/* Script tag */}
          <div className="relative">
            <pre className="bg-slate-900 text-green-400 p-6 rounded-lg overflow-x-auto font-mono text-sm leading-6 border border-slate-700">
              {scriptContent}
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

          {/* Copy status */}
          {copied && (
            <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-800 dark:text-green-200 px-4 py-3 rounded">
              ✓ Script copied to clipboard!
            </div>
          )}

          {/* Installation steps */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Installation Steps:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>Copy the script tag above</li>
              <li>Open your website's HTML file</li>
              <li>Paste in the &lt;head&gt; section</li>
              <li>Save and reload your website</li>
              <li>Analytics will start tracking automatically</li>
            </ol>
          </div>

          {/* Close button */}
          <Button onClick={onClose} className="w-full py-3">
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
