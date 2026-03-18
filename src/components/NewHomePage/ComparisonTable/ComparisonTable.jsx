import React from "react";
import "./ComparisonTable.css";

const rows = [
  { feature: "Perpetual (No Expiry)", panoptic: "✅", cex: "❌", defi: "❌" },
  { feature: "Any Token", panoptic: "✅", cex: "❌", defi: "~Limited" },
  { feature: "Self-Custody", panoptic: "✅", cex: "❌", defi: "✅" },
  { feature: "Oracle-Free", panoptic: "✅", cex: "N/A", defi: "❌" },
  { feature: "Up to 10x Leverage", panoptic: "✅", cex: "✅", defi: "~Limited" },
];

export default function ComparisonTable() {
  return (
    <div className="comparison-section" style={{ backgroundColor: "#0f0426" }}>
      <h2 className="comparison-heading">Built Different</h2>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th className="panoptic-col">Panoptic</th>
              <th>CEX Options</th>
              <th>Other DeFi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature}>
                <td>{r.feature}</td>
                <td className="panoptic-col">{r.panoptic}</td>
                <td>{r.cex}</td>
                <td>{r.defi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
