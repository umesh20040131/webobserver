export default function TestPage({
  params,
}: {
  params: { websiteId: string }
}) {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Test Page</h1>
      <p>Website ID: {params.websiteId}</p>
    </div>
  )
}
