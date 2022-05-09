interface PeepoApi {
  play(): any
  pause(): any
  listen(): any

  shuffle?: any
  onRaise?(): any
  onQuit?(): any
  onShuffle?(): any
  onLoop?(): any
  onPlay?(): any
  onPause?(): any
  onStop?(): any
  onPlayPause?(): any
  onVolume?(data: number): any
  onNext?(): any
  onPrevious?(): any
  onSeek?(seek: number): any
  onSelectTrack?(trackId: string): any
  sendMetadata?(track: SongJSON): any
  addTrack?(track: SongJSON): any
  removeTrack?(uuid: string): any
  clearTrackList?(): any
  setVolume?(volume: number): any
  setLoopStatus?(data: boolean): any
}

export default PeepoApi
