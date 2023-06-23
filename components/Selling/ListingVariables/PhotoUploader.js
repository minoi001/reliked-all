import React, { useState, useCallback, useRef, useEffect } from "react";
import * as LR from "@uploadcare/blocks";
import st from "../../../styles/App.module.css";
import { PACKAGE_VERSION } from "@uploadcare/blocks/env";
import Image from "next/image";

LR.registerBlocks(LR);

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
      <lr-file-uploader-regular
        class={"uploadcare-settings " + st.uploaderCfg}
        css-src={`https://unpkg.com/@uploadcare/blocks@${PACKAGE_VERSION}/web/file-uploader-regular.min.css`}
      >
        <lr-data-output
          ref={dataOutputRef}
          use-event
          hidden
          class={st.uploaderCfg}
          onEvent={handleUploaderEvent}
        ></lr-data-output>
      </lr-file-uploader-regular>

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
