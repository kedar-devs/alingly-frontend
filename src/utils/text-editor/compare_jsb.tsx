import type { JSONContent } from "@tiptap/react"
import { useMemo } from "react"
import DiffMatchPatch from "diff-match-patch"
import { generateText } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"

type compareJB={
    contentA: JSONContent,
    contentB: JSONContent
}
type DiffTuple = [number, string]
function CompareJsonBlob({contentA,contentB}:compareJB){

    const diffs=useMemo(()=>{
        const dc=new DiffMatchPatch()
        const oldText=generateText(contentB,[StarterKit])
        const newText= generateText(contentA,[StarterKit])
        const diff=dc.diff_main(oldText, newText) as DiffTuple[]
        dc.diff_cleanupSemantic(diff)
        return diff
    },[contentA,contentB])

    return (
        <div style={{ display: "flex", gap: "24px" }}>
      {/* OLD VERSION */}
      <div style={{ flex: 1, border: "1px solid #ddd", padding: "16px" }}>
        <h3>Old Version</h3>
        {diffs.map(([type, text], i) => {
          if (type === -1) {
            return (
              <span
                key={i}
                style={{
                  backgroundColor: "#ffe6e6",
                  textDecoration: "line-through",
                }}
              >
                {text}
              </span>
            )
          }
          if (type === 0) {
            return <span key={i}>{text}</span>
          }
          return null
        })} 
      </div>
        <div style={{ flex: 1, border: "1px solid #ddd", padding: "16px" }}>
        <h3>New Version</h3>
        {diffs.map(([type, text], i) => {
          if (type === 1) {
            return (
              <span
                key={i}
                style={{
                  backgroundColor: "#e6ffed",
                }}
              >
                {text}
              </span>
            )
          }
          if (type === 0) {
            return <span key={i}>{text}</span>
          }
          return null
        })}
      </div>
      </div>

    )

}

export default CompareJsonBlob