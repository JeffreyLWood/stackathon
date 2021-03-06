import React from "react";
import styles from "./styles.module.css";
export default function CVGroup(props) {
  return (
    <div className={`${styles.cvGroup} stagger`}>
      <header className={`${styles.h2}`}>{props.title}</header>

      <ul
        className={`font-light text-xs tracking-wider flex flex-col w-full sm:text-sm`}
      >
        {props.data &&
          props.data.map((line, index) => {
            let data = line.split(", ");
            return (
              <li
                className="grid grid-cols-12 grid-rows-7 w-full mb-4"
                key={index}
              >
                <span
                  id="date"
                  className="col-span-2 row-start-1 row-span-1 text-gray-500"
                >
                  {data[0]}
                </span>
                <div className="col-span-7 row-start-1 row-span-1  mr-2">
                  {
                    <>
                      <span id="place" className="font-medium text-gray-600">
                        {data[1]}
                        {data[2] ? "," : null}
                      </span>
                      <span id="title" className="italic">
                        {" "}
                        {data[2]}
                      </span>
                    </>
                  }
                </div>
                <span
                  id="location"
                  className="col-span-3 row-start-1 row-span-1 text-right pr-1"
                >
                  {data[3]}
                </span>
                {data[4] && data[4].includes("https://") ? (
                  <>
                    <span
                      id="link"
                      className="row-start-2 row-span-1 col-start-3 col-span-7 underline"
                    >
                      <a href={data[4]} target="_blank">
                        {data[4].slice(8)}
                      </a>
                    </span>
                    {data[5] ? (
                      <span
                        id="description"
                        className="row-start-3 row-span-3 col-start-4 col-span-7"
                      >
                        <ul className="list-disc">
                          <li>{data[5]}</li>
                          {data[6] ? <li>{data[6]}</li> : null}
                          {data[7] ? <li>{data[7]}</li> : null}
                        </ul>
                      </span>
                    ) : null}
                  </>
                ) : null}

                {data[4] && !data[4].includes("https://") ? (
                  <span className="row-start-2 row-span-4 col-start-4 col-span-6">
                    <ul className="list-disc">
                      <li>{data[4]}</li>
                      {data[5] ? <li>{data[5]}</li> : null}
                      {data[6] ? <li>{data[6]}</li> : null}
                    </ul>
                  </span>
                ) : null}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
