import React, { useEffect, useState, useRef } from "react";
import Loading from "./Loading";

const InfinityScroll = ({ loading, isMore, fetch }) => {
  const loader = useRef(fetch);
  const observer = useRef(
    new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current();
        }
      },
      { threshold: 1 }
    )
  );
  const [element, setElement] = useState(null);

  //get always the actual one
  useEffect(() => {
    loader.current = fetch;
  }, [fetch]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <>
      {loading && <Loading />}
      {!loading && isMore && <div ref={setElement} style={{ width: "100%" }}></div>}
    </>
  );
};

export default InfinityScroll;
