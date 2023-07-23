import React, { useCallback, useEffect, useRef, useState } from "react";
import st from "../../../styles/App.module.css";
import Image from "next/image";

function PhotoUploader() {
  const dataOutputRef = useRef();
  // TODO: We need to export all data output types
  const [files, setFiles] = useState([]);

  // TODO: We need to export all the event types
  const handleUploaderEvent = useCallback((e) => {
    const { data } = e.detail;
    setFiles(data);
  }, []);

  useEffect(() => {
    const el = dataOutputRef.current;

    // TODO: Augment global custom event types
    el?.addEventListener("lr-data-output", handleUploaderEvent);
    return () => {
      el?.removeEventListener("lr-data-output", handleUploaderEvent);
    };
  }, [handleUploaderEvent]);

  return (
    //     <div className={st.wrapper + " max-w-xs"}>
    <div className={st.wrapper}>
      <div className={"grid" + st.output}>
        {files.map((file) => (
          <div className="inline-flex p-1 w-1/4 h-36" key={file.uuid}>
            <Image
              className="object-contain p-1"
              key={file.uuid}
              src={`https://ucarecdn.com/${file.uuid}/${
                file.cdnUrlModifiers || ""
              }`}
              width="400"
              height="500"
              alt="Preview"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoUploader;
