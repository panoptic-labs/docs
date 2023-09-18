import React, { useEffect } from "react"
import './PolicyDocument.css'

interface PolicyDocumentProps {
  name: 'terms-of-use' | 'privacy-policy'
}

export default function PolicyDocument({ name }: PolicyDocumentProps) {
  useEffect(() => {
    const htmlElement = document.querySelector("html");
    htmlElement?.setAttribute("data-theme", "dark");
  }, []);

  return <div className="policy-document">
    {/* iframe name is used for external navigation inside the frame */}
    <iframe src={`/${name}.html`} name="policy-document"/>
  </div>
}