import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CountUpStat = ({ end, prefix = "", suffix = "", decimals = 0, duration = 2.5 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <span ref={ref} style={{ fontFamily: '"Fragment Mono", monospace' }}>
      {inView ? (
        <CountUp
          end={end}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          duration={duration}
          separator=","
        />
      ) : (
        <span>{prefix}0{suffix}</span>
      )}
    </span>
  );
};

export default CountUpStat;
