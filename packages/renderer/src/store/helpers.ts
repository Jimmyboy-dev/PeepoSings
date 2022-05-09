import { nanoid, createAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import type { Track } from '@peeposings/shared'

type ActionsBasicType = {
  [k: string]: (...payload: any) => any
}

export type ActionsType<actions extends ActionsBasicType> = {
  [k in keyof actions]: ReturnType<actions[k]>
}

export type PayloadType<actions extends ActionsType<ActionsBasicType>> = actions[keyof actions]['payload']

export const VoidAction = (actionName: string) => createAction(actionName, () => ({ payload: undefined }))

export const safeAddUuid = (track: Track) => {
  const clonedTrack = _.cloneDeep(track)
  if (_.isNil(track.uuid) || track.uuid.length === 0) {
    clonedTrack.uuid = nanoid()
  }

  return clonedTrack
}
