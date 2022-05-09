import type { TrackType } from '@peeposings/shared'
import _ from 'lodash'

export const getTrackTitle = (track: TrackType) => track?.name || track?.title

export const getTrackArtist = (track: TrackType) => (_.isString(track?.artist) ? track?.artist : track?.artist?.name)
