"""Entry-normalized P&L comparison in the Panoptic style.

Usage: python panoptic_payoff.py [STYLE] [OUTPUT] [--streamia AMOUNT]
Defaults to the adjacent stylesheet and panoptic_payoff.png.
Requires numpy, scipy, matplotlib. OUTPUT may also be .svg or .pdf.

The vanilla curves subtract the same upfront entry premium. Panoptic
subtracts its initial replication value, NOT an upfront option premium.
--streamia is an illustrative fixed accumulated cost per token0; actual
streamia is path-dependent and cannot be inferred from terminal price.
Funding, interest, trading fees and liquidation constraints are excluded.
"""
from pathlib import Path
import argparse
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.stats import norm
from scipy.optimize import minimize_scalar


def main():
    base = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("style", nargs="?", default=str(base / "panoptic-dark-16_9.mplstyle"))
    parser.add_argument("output", nargs="?", default=str(base / "perps-vs-options-payoff.png"))
    parser.add_argument("--streamia", type=float, default=0.0)
    args = parser.parse_args()
    if args.streamia < 0:
        parser.error("--streamia must be nonnegative")
    plt.style.use(args.style)

    K, entry_price, range_ratio, sigma = 100.0, 100.0, 1.15, 0.60
    a, b = K / range_ratio, K * range_ratio
    sa, sb = np.sqrt(a), np.sqrt(b)
    P = np.linspace(70, 130, 1201)
    L = 1 / (1 / sa - 1 / sb)

    def lp(price):
        s = np.sqrt(np.clip(price, a, b))
        return L * (1 / s - 1 / sb) * price + L * (s - sa)

    def bs(price, maturity):
        vol_time = sigma * np.sqrt(maturity)
        d1 = (np.log(price / K) + 0.5 * sigma**2 * maturity) / vol_time
        return price * norm.cdf(d1) - K * norm.cdf(d1 - vol_time)

    raw_panoptic = P - lp(P)
    # Preserve the original fit; use distinct styling to expose the overlap.
    T = minimize_scalar(
        lambda t: np.sum((bs(P, t) - raw_panoptic)**2),
        bounds=(1e-4, 0.2), method="bounded",
    ).x
    days = T * 365
    upfront_premium = float(bs(entry_price, T))
    panoptic_entry_value = float(entry_price - lp(entry_price))
    perp_pnl = P - entry_price
    expiry_pnl = np.maximum(P - K, 0) - upfront_premium
    vanilla_pnl = bs(P, T) - upfront_premium
    panoptic_pnl = raw_panoptic - panoptic_entry_value - args.streamia

    c = plt.rcParams["axes.prop_cycle"].by_key()["color"]
    original_size = np.array(plt.rcParams["figure.figsize"])
    fig, ax = plt.subplots(figsize=tuple(2 * original_size), layout="none")
    fig.subplots_adjust(left=0.105, right=0.925, bottom=0.15, top=0.77)
    ax.axvspan(a, b, color=c[0], alpha=0.10, lw=0)
    ax.grid(alpha=0.6, linewidth=0.4)
    ax.axhline(0, color="0.65", lw=0.5, alpha=0.6)

    perp, = ax.plot(P, perp_pnl, color=c[3], ls="--", lw=1.1,
                    label="Long perp")
    expiry, = ax.plot(P, expiry_pnl, color=c[5], ls=":", lw=1.25,
                      label="Vanilla call at expiry")
    pan, = ax.plot(P, panoptic_pnl, color=c[0], lw=2.8, zorder=4,
                   label=f"Panoptic call | range {a:.0f}-{b:.0f}")
    vanilla, = ax.plot(P, vanilla_pnl, color=c[1], lw=1.15,
                       ls=(0, (4, 3)), zorder=5,
                       label=f"Vanilla call | {days:.0f} days left, 60% IV")

    # Keep explanatory annotations clear of the payoff curves.
    for x, y, label, color in [
        ((80+a)/2, -7.5, "Out of range\nNo streamia", "0.7"),
        ((a+b)/2, -7.5, "In range\nBuyer pays streamia", c[0]),
        ((b+120)/2, -7.5, "Out of range\nNo streamia", "0.7"),
    ]:
        ax.text(x, y, label, ha="center", va="center",
                fontsize=6, color=color, linespacing=1.5)
    ax.set(xlim=(80, 120), ylim=(-10, 20),
           xlabel="Underlying price (entry = strike = 100)",
           ylabel="P&L per token of underlying")
    ax.set_xticks(np.arange(80, 121, 10))
    ax.set_yticks([-10, 0, 10, 20])
    ax.set_xlabel(ax.get_xlabel(), labelpad=8)
    fig.suptitle("Perp vs vanilla call vs Panoptic call", x=0.105,
                 y=0.96, ha="left", fontsize=10)
    fig.legend(handles=[perp, expiry, vanilla, pan], loc="upper left",
               bbox_to_anchor=(0.101, 0.888), ncol=2, fontsize=6.2,
               frameon=False, columnspacing=2.0, handlelength=3.2,
               labelspacing=0.7, borderaxespad=0)
    fig.savefig(args.output, dpi=plt.rcParams["figure.dpi"])
    print(f"Fit maturity: {days:.4f} days")
    print(f"Vanilla upfront premium: {upfront_premium:.6f}")
    print(f"Panoptic entry replication value: {panoptic_entry_value:.6f}")
    print(f"Figure: {fig.get_size_inches()} inches; {fig.dpi:g} dpi")
    print(f"Saved: {args.output}")


if __name__ == "__main__":
    main()
