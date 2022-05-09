import "./styles.scss";

import { Icon } from "@iconify/react";
import React from "react";

import Header from "../Header";
import DownloadsHeader from "./DownloadsHeader";
import { DownloadsItemProps } from "./DownloadsItem";
import DownloadsList from "./DownloadsList";

const EmptyState: React.FC = () => {
  return (
    <div className={'empty_state'}>
      <Icon icon="fa:download" />
      <h2>No Downloads Available</h2>
      <div></div>
    </div>
  )
}

type DownloadsProps = {
  downloads: DownloadsItemProps['item'][]
  downloadsDir: string
  // setStringOption: typeof setStringOption
  clearFinishedTracks: React.MouseEventHandler
  pauseDownload: (id: string) => void
  resumeDownload: (id: string) => void
  removeDownload: (id: string) => void
}

const Downloads: React.FC<DownloadsProps> = ({ downloads, downloadsDir, clearFinishedTracks, resumeDownload, pauseDownload, removeDownload }) => {
  return (
    <div className={'downloads_container'}>
      <DownloadsHeader directory={downloadsDir} />
      {downloads.length === 0 && <EmptyState />}
      {downloads.length > 0 && (
        <>
          <Header>Downloads</Header>
          <DownloadsList items={downloads} clearFinishedTracks={clearFinishedTracks} resumeDownload={resumeDownload} pauseDownload={pauseDownload} removeDownload={removeDownload} />
        </>
      )}
    </div>
  )
}

export default Downloads
