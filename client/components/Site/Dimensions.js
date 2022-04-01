import React from "react";

export default function Dimensions(props) {
  let height = props.data.height || null;
  let width = props.data.width || null;
  let depth = props.data.depth || null;
  let metric = props.data.metric || '"';

  let altHeight = null;
  let altWidth = null;
  let altDepth = null;
  let altMetric = null;

  if (metric === '"') {
    altHeight = props.data.height * 2.54;
    altWidth = props.data.width * 2.54;
    altDepth = props.data.depth * 2.54;
    altMetric = " cm";
  }
  if (metric === "cm") {
    metric = " cm";
    altHeight = (props.data.height / 2.54).toFixed(2);
    altWidth = (props.data.width / 2.54).toFixed(2);
    altDepth = (props.data.depth / 2.54).toFixed(2);
    altMetric = '"';
  }
  if (metric === "'") {
    altHeight = (props.data.height * 0.3048).toFixed(2);
    altWidth = (props.data.width * 0.3048).toFixed(2);
    altDepth = (props.data.depth * 0.3048).toFixed(2);
    altMetric = " m";
  }
  if (metric === "m") {
    metric = " m";
    altHeight = (props.data.height / 0.3048).toFixed(2);
    altWidth = (props.data.width / 0.3048).toFixed(2);
    altDepth = (props.data.depth / 0.3048).toFixed(2);
    altMetric = "'";
  }

  let x = "x";
  return (
    <span className="text-xs text-neutral-500 tracking-widest">
      {height ? `${height}` : null}
      {width ? ` ${x} ${width}` : null}
      {depth ? ` ${x} ${depth}` : null}
      {`${metric}`}
      <span className="text-neutral-400">
        {" "}
        ({height ? `${altHeight}` : null}
        {width ? ` ${x} ${altWidth}` : null}
        {depth ? ` ${x} ${altDepth}` : null}
        {`${altMetric}`})
      </span>
    </span>
  );
}
