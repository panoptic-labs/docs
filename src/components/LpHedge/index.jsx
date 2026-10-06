import React, {useMemo, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  SPOT,
  holdings,
  pnl,
  prices,
  range,
  shortPut,
  spreadMultiplier,
  tokens,
} from './math';
import styles from './styles.module.css';

// Same current-price line as the trade page's hedged swap graph.
const PRICE_LINE = {stroke: 'hsla(237, 79%, 60%, 1)', strokeDasharray: '5 3', strokeWidth: 2};
const LP_WIDTH = 25;
const fmt = (x, d = 2) => (Math.abs(x) < 0.005 ? '0.00' : x.toFixed(d));

function Slider({label, value, min, max, step = 1, onChange, display}) {
  return (
    <div className={styles.slider}>
      <label>
        {label}
        <output>{display ? display(value) : value}</output>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
    </div>
  );
}

function Legend({lines}) {
  return (
    <div className={styles.legend}>
      {lines.map((l) => (
        <span key={l.key}>
          <i style={{borderColor: l.color, borderTopStyle: l.dash ? 'dashed' : 'solid'}} />
          {l.name}
        </span>
      ))}
    </div>
  );
}

const axisProps = {
  stroke: 'var(--lp-muted)',
  tick: {fill: 'var(--lp-muted)', fontSize: 11},
};

function xTicks(xMax) {
  const out = [];
  for (let t = 0; t <= xMax; t += 25) out.push(t);
  return out;
}

function ticksFor([lo, hi]) {
  const span = hi - lo;
  const step = span <= 20 ? 5 : span <= 60 ? 10 : 25;
  const out = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi; t += step) out.push(t);
  return out;
}

const shading = (key, strike, width, fill, label, labelPosition) => ({key, ...range(strike, width), fill, label, labelPosition});

function PayoffChart({lines, ranges = [], price, yDomain = [-50, 25], xMax = 200, height = 300}) {
  const data = useMemo(
    () =>
      prices(xMax).map((P) => {
        const row = {P};
        lines.forEach((l) => {
          row[l.key] = l.fn(P);
        });
        return row;
      }),
    [lines, xMax],
  );
  return (
    <div>
      <div className={styles.panelLabel}>P&L in USDC per 1 ETH of notional, before fees</div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{top: 8, right: 8, bottom: 16, left: 0}}>
          <CartesianGrid stroke="var(--lp-grid)" />
          {ranges.map((r) => (
            <ReferenceArea
              key={r.key}
              x1={r.lower}
              x2={r.upper}
              fill={r.fill || 'var(--lp-range)'}
              ifOverflow="hidden"
              label={r.label ? {value: r.label, position: r.labelPosition || 'insideTop', fill: 'var(--lp-muted)', fontSize: 10, fontWeight: 600} : undefined}
            />
          ))}
          <XAxis
            dataKey="P"
            type="number"
            domain={[0, xMax]}
            ticks={xTicks(xMax)}
            allowDataOverflow
            label={{value: 'ETH price (USDC)', position: 'insideBottom', offset: -10, fill: 'var(--lp-muted)', fontSize: 12}}
            {...axisProps}
          />
          <YAxis domain={yDomain} ticks={ticksFor(yDomain)} allowDataOverflow width={36} {...axisProps} />
          <ReferenceLine y={0} stroke="var(--lp-muted)" />
          {price !== undefined && <ReferenceLine x={price} {...PRICE_LINE} />}
          {lines.map((l) => (
            <Line
              key={l.key}
              dataKey={l.key}
              name={l.name}
              stroke={l.color}
              strokeWidth={l.width || 2}
              strokeDasharray={l.dash ? '6 4' : undefined}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <Legend lines={lines} />
    </div>
  );
}

const TOKEN_LINES = [
  {key: 'eth', name: 'ETH (left axis)', color: 'var(--lp-extra)'},
  {key: 'usdc', name: 'USDC (right axis)', color: 'var(--lp-net)'},
];

// Token holdings of the whole position as a function of price.
function TokensChart({fn, ranges = [], price, xMax = 200, ethDomain = ['auto', 'auto'], usdcDomain = ['auto', 'auto']}) {
  const data = useMemo(() => prices(xMax).map((P) => ({P, ...fn(P)})), [fn, xMax]);
  const hasDebt = typeof ethDomain[0] === 'number' && ethDomain[0] < 0;
  return (
    <div>
      <div className={styles.panelLabel}>
        Tokens held by the position{hasDebt ? ' (below 0 = owed, i.e. debt)' : ''}
      </div>
      <ResponsiveContainer width="100%" height={170}>
        <LineChart data={data} margin={{top: 8, right: 0, bottom: 0, left: 0}}>
          <CartesianGrid stroke="var(--lp-grid)" />
          {ranges.map((r) => (
            <ReferenceArea key={r.key} yAxisId="eth" x1={r.lower} x2={r.upper} fill={r.fill || 'var(--lp-range)'} ifOverflow="hidden" />
          ))}
          <XAxis dataKey="P" type="number" domain={[0, xMax]} ticks={xTicks(xMax)} allowDataOverflow {...axisProps} />
          <YAxis yAxisId="eth" domain={ethDomain} width={40} tickFormatter={(v) => fmt(v)} {...axisProps} />
          <YAxis yAxisId="usdc" orientation="right" domain={usdcDomain} width={40} tickFormatter={(v) => v.toFixed(0)} {...axisProps} />
          {hasDebt && (
            <ReferenceArea
              yAxisId="eth"
              y1={ethDomain[0]}
              y2={0}
              fill="rgba(239, 68, 68, 0.08)"
              ifOverflow="hidden"
              label={{value: 'DEBT', position: 'insideBottomLeft', fill: 'var(--lp-muted)', fontSize: 10, fontWeight: 600}}
            />
          )}
          <ReferenceLine yAxisId="eth" y={0} stroke="var(--lp-muted)" />
          {price !== undefined && <ReferenceLine yAxisId="eth" x={price} {...PRICE_LINE} />}
          <Line yAxisId="eth" dataKey="eth" name="ETH" stroke="var(--lp-extra)" strokeWidth={2} dot={false} isAnimationActive={false} />
          <Line yAxisId="usdc" dataKey="usdc" name="USDC" stroke="var(--lp-net)" strokeWidth={2} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
      <Legend lines={TOKEN_LINES} />
    </div>
  );
}

function Card({left, rightTop, controls, note}) {
  return (
    <div className={styles.card}>
      <div className={styles.split}>
        <div>{left}</div>
        <div className={styles.right}>
          {rightTop}
          <div className={styles.controls}>{controls}</div>
        </div>
      </div>
      {note && <div className={styles.note}>{note}</div>}
    </div>
  );
}

const widthLabel = (w) => {
  const {lower, upper} = range(SPOT, w);
  return `±${w}% (${lower.toFixed(0)}–${upper.toFixed(0)})`;
};

const LONG_FILL = 'rgba(124, 234, 197, 0.12)';
const SHORT_PUT = {type: 'put', side: 1, strike: SPOT, width: LP_WIDTH};

// A combined position: payoff chart on the left, token chart top right.
function Combo({legs, lines, ranges, controls, note, yDomain, usdcDomain}) {
  const tokenFn = useMemo(() => (P) => tokens(P, legs), [legs]);
  return (
    <Card
      left={<PayoffChart lines={lines} ranges={ranges} yDomain={yDomain} />}
      rightTop={<TokensChart fn={tokenFn} ranges={ranges} ethDomain={[-1, 1]} usdcDomain={usdcDomain} />}
      controls={controls}
      note={note}
    />
  );
}

// 1. The LP position on its own, with its token holdings.
function LpShortPutInner() {
  const [price, setPrice] = useState(SPOT);
  const [width, setWidth] = useState(20);
  const xMax = 200;
  const rg = range(SPOT, width);
  const lines = useMemo(
    () => [
      {
        key: 'lp',
        name: 'Uniswap LP = short put (strike 100)',
        color: 'var(--lp-short)',
        fn: (P) => shortPut(P, SPOT, width) - shortPut(price, SPOT, width),
        width: 3,
      },
    ],
    [width, price],
  );
  const tokenFn = useMemo(() => (P) => holdings(P, SPOT, width), [width]);
  return (
    <Card
      left={<PayoffChart lines={lines} ranges={[{key: 'lp', ...rg}]} price={price} xMax={xMax} yDomain={[-50, 50]} />}
      rightTop={<TokensChart fn={tokenFn} ranges={[{key: 'lp', ...rg}]} price={price} xMax={xMax} ethDomain={[0, 1]} usdcDomain={[0, 100]} />}
      controls={
        <>
          <Slider label="Starting price" value={price} min={1} max={xMax} onChange={setPrice} />
          <Slider label="Range width" value={width} min={1} max={50} onChange={setWidth} display={widthLabel} />
        </>
      }
      note="A range centered at 100, entered when ETH is at the starting price, so P&L is 0 there. Below the range the position holds 1 ETH; above it, 100 USDC."
    />
  );
}

// 2.1 Short put plus a loan that borrows and sells ETH.
function LoanHedgeInner() {
  const delta0 = holdings(SPOT, SPOT, LP_WIDTH).eth;
  const [borrowed, setBorrowed] = useState(Math.round(delta0 * 100) / 100);
  const legs = useMemo(() => [SHORT_PUT, {type: 'loan', eth: borrowed}], [borrowed]);
  const lines = useMemo(
    () => [
      {key: 'lp', name: 'LP (short put)', color: 'var(--lp-short)', fn: (P) => pnl(P, [legs[0]])},
      {key: 'loan', name: 'Loan: borrow and sell ETH', color: 'var(--lp-hedge)', dash: true, fn: (P) => pnl(P, [legs[1]])},
      {key: 'net', name: 'Net position', color: 'var(--lp-net)', width: 3, fn: (P) => pnl(P, legs)},
    ],
    [legs],
  );
  return (
    <Combo
      legs={legs}
      lines={lines}
      ranges={[shading('lp', SPOT, LP_WIDTH)]}
      yDomain={[-30, 30]}
      usdcDomain={[0, 200]}
      controls={
        <Slider
          label="Loan size"
          value={borrowed}
          min={0}
          max={1}
          step={0.01}
          onChange={setBorrowed}
          display={(v) => `${((v / delta0) * 100).toFixed(0)}% of LP delta · ${v.toFixed(2)} ETH`}
        />
      }
      note="At 100% of the LP's delta, the loan cancels the LP's delta at 100, leaving only its curvature. At the maximum, 1 ETH, it cancels the 1 ETH the LP holds below its range. The loan shows up as negative ETH. Borrow interest and fees are not shown."
    />
  );
}

// 2.2 Short put plus a long put at another strike: a vertical put spread.
function PutSpreadInner() {
  const [strike, setStrike] = useState(90);
  const legs = useMemo(() => [SHORT_PUT, {type: 'put', side: -1, strike, width: LP_WIDTH}], [strike]);
  const kind = strike < SPOT ? 'put credit spread' : strike > SPOT ? 'put debit spread' : 'flat';
  const lines = useMemo(
    () => [
      {key: 'lp', name: 'LP (short put, strike 100)', color: 'var(--lp-short)', fn: (P) => pnl(P, [legs[0]])},
      {key: 'long', name: `Long put, strike ${strike}`, color: 'var(--lp-hedge)', dash: true, fn: (P) => pnl(P, [legs[1]])},
      {key: 'net', name: `Net: ${kind}`, color: 'var(--lp-net)', width: 3, fn: (P) => pnl(P, legs)},
    ],
    [legs],
  );
  return (
    <Combo
      legs={legs}
      lines={lines}
      ranges={[shading('lp', SPOT, LP_WIDTH, undefined, 'SHORT PUT', 'insideTop'), shading('long', strike, LP_WIDTH, LONG_FILL, 'LONG PUT', 'insideBottom')]}
      yDomain={[-50, 50]}
      usdcDomain={[-180, 180]}
      controls={<Slider label="Long put strike" value={strike} min={50} max={150} onChange={setStrike} />}
      note="Both ranges are ±25%. Below 100, the long put caps the LP's loss (a credit spread). Above 100, it turns the position into a bearish debit spread. At 100 the two legs cancel."
    />
  );
}

// 2.3 Short put plus a long put at the same strike with a different width.
const CAL_WIDTH = 25;

function CalendarInner() {
  const [width, setWidth] = useState(40);
  const short = {type: 'put', side: 1, strike: SPOT, width: CAL_WIDTH};
  const legs = useMemo(() => [short, {type: 'put', side: -1, strike: SPOT, width}], [width]);
  const kind = width > CAL_WIDTH ? 'long calendar spread' : width < CAL_WIDTH ? 'short calendar spread' : 'flat';
  const lines = useMemo(
    () => [
      {key: 'lp', name: `LP (short put, ±${CAL_WIDTH}%)`, color: 'var(--lp-short)', fn: (P) => pnl(P, [legs[0]])},
      {key: 'long', name: `Long put, ±${width}%`, color: 'var(--lp-hedge)', dash: true, fn: (P) => pnl(P, [legs[1]])},
      {key: 'net', name: `Net: ${kind}`, color: 'var(--lp-net)', width: 3, fn: (P) => pnl(P, legs)},
    ],
    [legs],
  );
  return (
    <Combo
      legs={legs}
      lines={lines}
      ranges={[shading('long', SPOT, width, LONG_FILL, 'LONG PUT', 'insideTopRight'), shading('lp', SPOT, CAL_WIDTH, undefined, 'SHORT PUT', 'insideBottom')]}
      yDomain={[-15, 10]}
      usdcDomain={[-100, 100]}
      controls={<Slider label="Long put range width" value={width} min={5} max={100} onChange={setWidth} display={widthLabel} />}
      note="Same strike, different widths. Far from the strike both legs are fully in or out of the money and cancel, so the risk is defined. Width plays the role of time to expiry: a wider long put is a long calendar, a narrower one a short calendar."
    />
  );
}

// 2.4 Short put plus a short call: a short strangle (straddle at the same strike).
const STRANGLE_WIDTH = LP_WIDTH;

function StrangleInner() {
  const [strike, setStrike] = useState(SPOT);
  const put = {type: 'put', side: 1, strike: SPOT, width: STRANGLE_WIDTH};
  const legs = useMemo(() => [put, {type: 'call', side: 1, strike, width: STRANGLE_WIDTH}], [strike]);
  const lines = useMemo(
    () => [
      {key: 'lp', name: 'Short put, strike 100', color: 'var(--lp-short)', fn: (P) => pnl(P, [legs[0]])},
      {key: 'call', name: `Short call, strike ${strike}`, color: 'var(--lp-hedge)', dash: true, fn: (P) => pnl(P, [legs[1]])},
      {key: 'net', name: strike === SPOT ? 'Net: short straddle' : 'Net: short strangle', color: 'var(--lp-net)', width: 3, fn: (P) => pnl(P, legs)},
    ],
    [legs],
  );
  return (
    <Combo
      legs={legs}
      lines={lines}
      ranges={[shading('lp', SPOT, STRANGLE_WIDTH), shading('call', strike, STRANGLE_WIDTH, LONG_FILL)]}
      yDomain={[-50, 10]}
      usdcDomain={[0, 300]}
      controls={<Slider label="Short call strike" value={strike} min={10} max={200} onChange={setStrike} />}
      note="Both ranges are ±25% and both legs earn fees and streamia. With the call at 100 the position is close to delta neutral; moving the call strike away changes which way it leans."
    />
  );
}

// 2.5 Short put earning streamia at a utilization set by the slider.
const DAILY_FEES = 0.3;
const EARN_DAYS = 50;
const EARN_WIDTH = 50;
const EARN_PUT = {type: 'put', side: 1, strike: SPOT, width: EARN_WIDTH};
const EARN_RANGE = range(SPOT, EARN_WIDTH);

// One liquidity chunk, drawn like the trade page's StrikeInfo: the outlined bar
// is total liquidity, the solid bar is what remains after buyers remove some.
function LiquidityBar({utilization}) {
  return (
    <div>
      <div className={styles.panelLabel}>Liquidity in your range</div>
      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={[{P: 0}, {P: 200}]} margin={{top: 8, right: 8, bottom: 0, left: 0}}>
          <CartesianGrid stroke="var(--lp-grid)" />
          <XAxis dataKey="P" type="number" domain={[0, 200]} ticks={xTicks(200)} {...axisProps} />
          <YAxis domain={[0, 1]} ticks={[0, 0.5, 1]} width={36} tickFormatter={(v) => `${v * 100}%`} {...axisProps} />
          <ReferenceArea x1={EARN_RANGE.lower} x2={EARN_RANGE.upper} y1={0} y2={1} fill="var(--lp-short)" fillOpacity={0.1} stroke="var(--lp-short)" />
          <ReferenceArea x1={EARN_RANGE.lower} x2={EARN_RANGE.upper} y1={0} y2={1 - utilization} fill="var(--lp-short)" fillOpacity={0.5} stroke="var(--lp-short)" />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.legend}>
        <span>
          <i style={{borderColor: 'var(--lp-short)', opacity: 0.4}} />
          Removed by buyers ({(utilization * 100).toFixed(0)}%)
        </span>
        <span>
          <i style={{borderColor: 'var(--lp-short)'}} />
          Remaining
        </span>
      </div>
    </div>
  );
}

function EarnMoreInner() {
  const [utilization, setUtilization] = useState(50);
  const u = utilization / 100;
  const totalFeeMultiplier = 1 - u + u * spreadMultiplier(u);
  const lines = useMemo(
    () => [
      {key: 'lp', name: `Short put + ${EARN_DAYS} days of Uniswap fees (1.0×)`, color: 'var(--lp-short)', width: 2, fn: (P) => pnl(P, [EARN_PUT]) + DAILY_FEES * EARN_DAYS},
      {key: 'earned', name: `Short put + ${EARN_DAYS} days of fees and streamia (${totalFeeMultiplier.toFixed(2)}×)`, color: 'var(--lp-net)', width: 3, fn: (P) => pnl(P, [EARN_PUT]) + DAILY_FEES * totalFeeMultiplier * EARN_DAYS},
    ],
    [totalFeeMultiplier],
  );
  const accrual = useMemo(
    () =>
      Array.from({length: EARN_DAYS + 1}, (_, d) => ({
        d,
        fees: DAILY_FEES * d,
        panopticEarnings: DAILY_FEES * totalFeeMultiplier * d,
      })),
    [totalFeeMultiplier],
  );
  return (
    <Card
      left={<PayoffChart lines={lines} ranges={[{key: 'lp', ...EARN_RANGE}]} yDomain={[-25, 50]} />}
      rightTop={
        <>
          <LiquidityBar utilization={u} />
          <div>
            <div className={styles.panelLabel}>Earnings over {EARN_DAYS} days, price staying at 100 (illustrative)</div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={accrual} margin={{top: 8, right: 8, bottom: 0, left: 0}}>
                <CartesianGrid stroke="var(--lp-grid)" />
                <XAxis dataKey="d" type="number" domain={[0, EARN_DAYS]} ticks={[0, 10, 20, 30, 40, 50]} {...axisProps} />
                <YAxis domain={[0, 35]} ticks={[0, 10, 20, 30]} width={36} {...axisProps} />
                <Line dataKey="fees" name="Uniswap fees only" stroke="var(--lp-muted)" strokeDasharray="6 4" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line dataKey="panopticEarnings" name="Uniswap fees + streamia" stroke="var(--lp-net)" strokeWidth={3} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
            <Legend
              lines={[
                {key: 'fees', name: 'Uniswap fees only', color: 'var(--lp-muted)', dash: true},
                {key: 'panopticEarnings', name: `Uniswap fees + streamia (${totalFeeMultiplier.toFixed(2)}×)`, color: 'var(--lp-net)'},
              ]}
            />
          </div>
        </>
      }
      controls={
        <Slider label="Utilization of your range" value={utilization} min={0} max={90} onChange={setUtilization} display={(v) => `${v}%`} />
      }
      note="Fee levels are made up to show the shape, not real market data. Remaining liquidity earns ordinary Uniswap fees; liquidity removed by buyers earns spread-adjusted streamia. The illustrative total earnings multiplier rises from 1× at 0% utilization to 2.0125× at 90%. Real utilization depends on where buyers trade, so it varies by strike and over time."
    />
  );
}

const wrap = (Inner) =>
  function Wrapped() {
    return <BrowserOnly fallback={<div className={styles.card} style={{minHeight: 360}} />}>{() => <Inner />}</BrowserOnly>;
  };

export const LpShortPut = wrap(LpShortPutInner);
export const LoanHedge = wrap(LoanHedgeInner);
export const PutSpread = wrap(PutSpreadInner);
export const CalendarSpread = wrap(CalendarInner);
export const ShortStrangle = wrap(StrangleInner);
export const EarnMore = wrap(EarnMoreInner);
