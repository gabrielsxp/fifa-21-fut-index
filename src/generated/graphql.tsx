import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** A time string with format: HH:mm:ss.SSS */
  Time: any
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** The `Long` scalar type represents 52-bit integers */
  Long: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type FileInfoInput = {
  name?: Maybe<Scalars['String']>
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
}

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe'
  id: Scalars['ID']
  username: Scalars['String']
  email: Scalars['String']
  confirmed?: Maybe<Scalars['Boolean']>
  blocked?: Maybe<Scalars['Boolean']>
  role?: Maybe<UsersPermissionsMeRole>
}

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole'
  id: Scalars['ID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type UsersPermissionsRegisterInput = {
  username: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']
  password: Scalars['String']
  provider?: Maybe<Scalars['String']>
}

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload'
  jwt?: Maybe<Scalars['String']>
  user: UsersPermissionsMe
}

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload'
  ok: Scalars['Boolean']
}

export type Nation = {
  __typename?: 'Nation'
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  name?: Maybe<Scalars['String']>
  image?: Maybe<UploadFile>
  slug?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
  players?: Maybe<Array<Maybe<Player>>>
}

export type NationPlayersArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type NationConnection = {
  __typename?: 'NationConnection'
  values?: Maybe<Array<Maybe<Nation>>>
  groupBy?: Maybe<NationGroupBy>
  aggregate?: Maybe<NationAggregator>
}

export type NationAggregator = {
  __typename?: 'NationAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type NationGroupBy = {
  __typename?: 'NationGroupBy'
  id?: Maybe<Array<Maybe<NationConnectionId>>>
  created_at?: Maybe<Array<Maybe<NationConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<NationConnectionUpdated_At>>>
  name?: Maybe<Array<Maybe<NationConnectionName>>>
  image?: Maybe<Array<Maybe<NationConnectionImage>>>
  slug?: Maybe<Array<Maybe<NationConnectionSlug>>>
  published_at?: Maybe<Array<Maybe<NationConnectionPublished_At>>>
}

export type NationConnectionId = {
  __typename?: 'NationConnectionId'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<NationConnection>
}

export type NationConnectionCreated_At = {
  __typename?: 'NationConnectionCreated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<NationConnection>
}

export type NationConnectionUpdated_At = {
  __typename?: 'NationConnectionUpdated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<NationConnection>
}

export type NationConnectionName = {
  __typename?: 'NationConnectionName'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<NationConnection>
}

export type NationConnectionImage = {
  __typename?: 'NationConnectionImage'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<NationConnection>
}

export type NationConnectionSlug = {
  __typename?: 'NationConnectionSlug'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<NationConnection>
}

export type NationConnectionPublished_At = {
  __typename?: 'NationConnectionPublished_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<NationConnection>
}

export type NationInput = {
  name?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['ID']>
  players?: Maybe<Array<Maybe<Scalars['ID']>>>
  slug?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditNationInput = {
  name?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['ID']>
  players?: Maybe<Array<Maybe<Scalars['ID']>>>
  slug?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type CreateNationInput = {
  data?: Maybe<NationInput>
}

export type CreateNationPayload = {
  __typename?: 'createNationPayload'
  nation?: Maybe<Nation>
}

export type UpdateNationInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditNationInput>
}

export type UpdateNationPayload = {
  __typename?: 'updateNationPayload'
  nation?: Maybe<Nation>
}

export type DeleteNationInput = {
  where?: Maybe<InputId>
}

export type DeleteNationPayload = {
  __typename?: 'deleteNationPayload'
  nation?: Maybe<Nation>
}

export type Player = {
  __typename?: 'Player'
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  player_id?: Maybe<Scalars['Long']>
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['String']>
  overall?: Maybe<Scalars['Int']>
  age?: Maybe<Scalars['Int']>
  hits?: Maybe<Scalars['Long']>
  potential?: Maybe<Scalars['Int']>
  photo?: Maybe<UploadFile>
  value?: Maybe<Scalars['String']>
  wage?: Maybe<Scalars['String']>
  special?: Maybe<Scalars['Long']>
  preferred_foot?: Maybe<Scalars['String']>
  body_type?: Maybe<Scalars['String']>
  real_face?: Maybe<Scalars['String']>
  joined?: Maybe<Scalars['String']>
  loaned_from?: Maybe<Scalars['String']>
  contract_valid_until?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['String']>
  crossing?: Maybe<Scalars['Int']>
  finishing?: Maybe<Scalars['Int']>
  heading_accuracy?: Maybe<Scalars['Int']>
  short_passing?: Maybe<Scalars['Int']>
  volleys?: Maybe<Scalars['Int']>
  dribbling?: Maybe<Scalars['Int']>
  curve?: Maybe<Scalars['Int']>
  f_k_accuracy?: Maybe<Scalars['Int']>
  long_passing?: Maybe<Scalars['Int']>
  ball_control?: Maybe<Scalars['Int']>
  acceleration?: Maybe<Scalars['Int']>
  sprint_speed?: Maybe<Scalars['Int']>
  agility?: Maybe<Scalars['Int']>
  reactions?: Maybe<Scalars['Int']>
  balance?: Maybe<Scalars['Int']>
  shot_power?: Maybe<Scalars['Int']>
  jumping?: Maybe<Scalars['Int']>
  stamina?: Maybe<Scalars['Int']>
  strength?: Maybe<Scalars['Int']>
  long_shots?: Maybe<Scalars['Int']>
  aggression?: Maybe<Scalars['Int']>
  interceptions?: Maybe<Scalars['Int']>
  positioning?: Maybe<Scalars['Int']>
  vision?: Maybe<Scalars['Int']>
  penalties?: Maybe<Scalars['Int']>
  composure?: Maybe<Scalars['Int']>
  marking?: Maybe<Scalars['Int']>
  standing_tackle?: Maybe<Scalars['Int']>
  sliding_tackle?: Maybe<Scalars['Int']>
  g_k_diving?: Maybe<Scalars['Int']>
  g_k_handling?: Maybe<Scalars['Int']>
  g_k_kicking?: Maybe<Scalars['Int']>
  g_k_positioning?: Maybe<Scalars['Int']>
  g_k_reflexes?: Maybe<Scalars['Int']>
  best_position?: Maybe<Scalars['String']>
  nation?: Maybe<Nation>
  team?: Maybe<Team>
  international_reputation?: Maybe<Scalars['Int']>
  weak_foot?: Maybe<Scalars['Int']>
  skill_moves?: Maybe<Scalars['Int']>
  work_rate?: Maybe<Scalars['String']>
  jersey_number?: Maybe<Scalars['Int']>
  defensive_awareness?: Maybe<Scalars['Int']>
  best_overall_rating?: Maybe<Scalars['Int']>
  slug?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
}

export type PlayerConnection = {
  __typename?: 'PlayerConnection'
  values?: Maybe<Array<Maybe<Player>>>
  groupBy?: Maybe<PlayerGroupBy>
  aggregate?: Maybe<PlayerAggregator>
}

export type PlayerAggregator = {
  __typename?: 'PlayerAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
  sum?: Maybe<PlayerAggregatorSum>
  avg?: Maybe<PlayerAggregatorAvg>
  min?: Maybe<PlayerAggregatorMin>
  max?: Maybe<PlayerAggregatorMax>
}

export type PlayerAggregatorSum = {
  __typename?: 'PlayerAggregatorSum'
  overall?: Maybe<Scalars['Float']>
  age?: Maybe<Scalars['Float']>
  potential?: Maybe<Scalars['Float']>
  crossing?: Maybe<Scalars['Float']>
  finishing?: Maybe<Scalars['Float']>
  heading_accuracy?: Maybe<Scalars['Float']>
  short_passing?: Maybe<Scalars['Float']>
  volleys?: Maybe<Scalars['Float']>
  dribbling?: Maybe<Scalars['Float']>
  curve?: Maybe<Scalars['Float']>
  f_k_accuracy?: Maybe<Scalars['Float']>
  long_passing?: Maybe<Scalars['Float']>
  ball_control?: Maybe<Scalars['Float']>
  acceleration?: Maybe<Scalars['Float']>
  sprint_speed?: Maybe<Scalars['Float']>
  agility?: Maybe<Scalars['Float']>
  reactions?: Maybe<Scalars['Float']>
  balance?: Maybe<Scalars['Float']>
  shot_power?: Maybe<Scalars['Float']>
  jumping?: Maybe<Scalars['Float']>
  stamina?: Maybe<Scalars['Float']>
  strength?: Maybe<Scalars['Float']>
  long_shots?: Maybe<Scalars['Float']>
  aggression?: Maybe<Scalars['Float']>
  interceptions?: Maybe<Scalars['Float']>
  positioning?: Maybe<Scalars['Float']>
  vision?: Maybe<Scalars['Float']>
  penalties?: Maybe<Scalars['Float']>
  composure?: Maybe<Scalars['Float']>
  marking?: Maybe<Scalars['Float']>
  standing_tackle?: Maybe<Scalars['Float']>
  sliding_tackle?: Maybe<Scalars['Float']>
  g_k_diving?: Maybe<Scalars['Float']>
  g_k_handling?: Maybe<Scalars['Float']>
  g_k_kicking?: Maybe<Scalars['Float']>
  g_k_positioning?: Maybe<Scalars['Float']>
  g_k_reflexes?: Maybe<Scalars['Float']>
  international_reputation?: Maybe<Scalars['Float']>
  weak_foot?: Maybe<Scalars['Float']>
  skill_moves?: Maybe<Scalars['Float']>
  jersey_number?: Maybe<Scalars['Float']>
  defensive_awareness?: Maybe<Scalars['Float']>
  best_overall_rating?: Maybe<Scalars['Float']>
}

export type PlayerAggregatorAvg = {
  __typename?: 'PlayerAggregatorAvg'
  overall?: Maybe<Scalars['Float']>
  age?: Maybe<Scalars['Float']>
  potential?: Maybe<Scalars['Float']>
  crossing?: Maybe<Scalars['Float']>
  finishing?: Maybe<Scalars['Float']>
  heading_accuracy?: Maybe<Scalars['Float']>
  short_passing?: Maybe<Scalars['Float']>
  volleys?: Maybe<Scalars['Float']>
  dribbling?: Maybe<Scalars['Float']>
  curve?: Maybe<Scalars['Float']>
  f_k_accuracy?: Maybe<Scalars['Float']>
  long_passing?: Maybe<Scalars['Float']>
  ball_control?: Maybe<Scalars['Float']>
  acceleration?: Maybe<Scalars['Float']>
  sprint_speed?: Maybe<Scalars['Float']>
  agility?: Maybe<Scalars['Float']>
  reactions?: Maybe<Scalars['Float']>
  balance?: Maybe<Scalars['Float']>
  shot_power?: Maybe<Scalars['Float']>
  jumping?: Maybe<Scalars['Float']>
  stamina?: Maybe<Scalars['Float']>
  strength?: Maybe<Scalars['Float']>
  long_shots?: Maybe<Scalars['Float']>
  aggression?: Maybe<Scalars['Float']>
  interceptions?: Maybe<Scalars['Float']>
  positioning?: Maybe<Scalars['Float']>
  vision?: Maybe<Scalars['Float']>
  penalties?: Maybe<Scalars['Float']>
  composure?: Maybe<Scalars['Float']>
  marking?: Maybe<Scalars['Float']>
  standing_tackle?: Maybe<Scalars['Float']>
  sliding_tackle?: Maybe<Scalars['Float']>
  g_k_diving?: Maybe<Scalars['Float']>
  g_k_handling?: Maybe<Scalars['Float']>
  g_k_kicking?: Maybe<Scalars['Float']>
  g_k_positioning?: Maybe<Scalars['Float']>
  g_k_reflexes?: Maybe<Scalars['Float']>
  international_reputation?: Maybe<Scalars['Float']>
  weak_foot?: Maybe<Scalars['Float']>
  skill_moves?: Maybe<Scalars['Float']>
  jersey_number?: Maybe<Scalars['Float']>
  defensive_awareness?: Maybe<Scalars['Float']>
  best_overall_rating?: Maybe<Scalars['Float']>
}

export type PlayerAggregatorMin = {
  __typename?: 'PlayerAggregatorMin'
  overall?: Maybe<Scalars['Float']>
  age?: Maybe<Scalars['Float']>
  potential?: Maybe<Scalars['Float']>
  crossing?: Maybe<Scalars['Float']>
  finishing?: Maybe<Scalars['Float']>
  heading_accuracy?: Maybe<Scalars['Float']>
  short_passing?: Maybe<Scalars['Float']>
  volleys?: Maybe<Scalars['Float']>
  dribbling?: Maybe<Scalars['Float']>
  curve?: Maybe<Scalars['Float']>
  f_k_accuracy?: Maybe<Scalars['Float']>
  long_passing?: Maybe<Scalars['Float']>
  ball_control?: Maybe<Scalars['Float']>
  acceleration?: Maybe<Scalars['Float']>
  sprint_speed?: Maybe<Scalars['Float']>
  agility?: Maybe<Scalars['Float']>
  reactions?: Maybe<Scalars['Float']>
  balance?: Maybe<Scalars['Float']>
  shot_power?: Maybe<Scalars['Float']>
  jumping?: Maybe<Scalars['Float']>
  stamina?: Maybe<Scalars['Float']>
  strength?: Maybe<Scalars['Float']>
  long_shots?: Maybe<Scalars['Float']>
  aggression?: Maybe<Scalars['Float']>
  interceptions?: Maybe<Scalars['Float']>
  positioning?: Maybe<Scalars['Float']>
  vision?: Maybe<Scalars['Float']>
  penalties?: Maybe<Scalars['Float']>
  composure?: Maybe<Scalars['Float']>
  marking?: Maybe<Scalars['Float']>
  standing_tackle?: Maybe<Scalars['Float']>
  sliding_tackle?: Maybe<Scalars['Float']>
  g_k_diving?: Maybe<Scalars['Float']>
  g_k_handling?: Maybe<Scalars['Float']>
  g_k_kicking?: Maybe<Scalars['Float']>
  g_k_positioning?: Maybe<Scalars['Float']>
  g_k_reflexes?: Maybe<Scalars['Float']>
  international_reputation?: Maybe<Scalars['Float']>
  weak_foot?: Maybe<Scalars['Float']>
  skill_moves?: Maybe<Scalars['Float']>
  jersey_number?: Maybe<Scalars['Float']>
  defensive_awareness?: Maybe<Scalars['Float']>
  best_overall_rating?: Maybe<Scalars['Float']>
}

export type PlayerAggregatorMax = {
  __typename?: 'PlayerAggregatorMax'
  overall?: Maybe<Scalars['Float']>
  age?: Maybe<Scalars['Float']>
  potential?: Maybe<Scalars['Float']>
  crossing?: Maybe<Scalars['Float']>
  finishing?: Maybe<Scalars['Float']>
  heading_accuracy?: Maybe<Scalars['Float']>
  short_passing?: Maybe<Scalars['Float']>
  volleys?: Maybe<Scalars['Float']>
  dribbling?: Maybe<Scalars['Float']>
  curve?: Maybe<Scalars['Float']>
  f_k_accuracy?: Maybe<Scalars['Float']>
  long_passing?: Maybe<Scalars['Float']>
  ball_control?: Maybe<Scalars['Float']>
  acceleration?: Maybe<Scalars['Float']>
  sprint_speed?: Maybe<Scalars['Float']>
  agility?: Maybe<Scalars['Float']>
  reactions?: Maybe<Scalars['Float']>
  balance?: Maybe<Scalars['Float']>
  shot_power?: Maybe<Scalars['Float']>
  jumping?: Maybe<Scalars['Float']>
  stamina?: Maybe<Scalars['Float']>
  strength?: Maybe<Scalars['Float']>
  long_shots?: Maybe<Scalars['Float']>
  aggression?: Maybe<Scalars['Float']>
  interceptions?: Maybe<Scalars['Float']>
  positioning?: Maybe<Scalars['Float']>
  vision?: Maybe<Scalars['Float']>
  penalties?: Maybe<Scalars['Float']>
  composure?: Maybe<Scalars['Float']>
  marking?: Maybe<Scalars['Float']>
  standing_tackle?: Maybe<Scalars['Float']>
  sliding_tackle?: Maybe<Scalars['Float']>
  g_k_diving?: Maybe<Scalars['Float']>
  g_k_handling?: Maybe<Scalars['Float']>
  g_k_kicking?: Maybe<Scalars['Float']>
  g_k_positioning?: Maybe<Scalars['Float']>
  g_k_reflexes?: Maybe<Scalars['Float']>
  international_reputation?: Maybe<Scalars['Float']>
  weak_foot?: Maybe<Scalars['Float']>
  skill_moves?: Maybe<Scalars['Float']>
  jersey_number?: Maybe<Scalars['Float']>
  defensive_awareness?: Maybe<Scalars['Float']>
  best_overall_rating?: Maybe<Scalars['Float']>
}

export type PlayerGroupBy = {
  __typename?: 'PlayerGroupBy'
  id?: Maybe<Array<Maybe<PlayerConnectionId>>>
  created_at?: Maybe<Array<Maybe<PlayerConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<PlayerConnectionUpdated_At>>>
  player_id?: Maybe<Array<Maybe<PlayerConnectionPlayer_Id>>>
  name?: Maybe<Array<Maybe<PlayerConnectionName>>>
  position?: Maybe<Array<Maybe<PlayerConnectionPosition>>>
  overall?: Maybe<Array<Maybe<PlayerConnectionOverall>>>
  age?: Maybe<Array<Maybe<PlayerConnectionAge>>>
  hits?: Maybe<Array<Maybe<PlayerConnectionHits>>>
  potential?: Maybe<Array<Maybe<PlayerConnectionPotential>>>
  photo?: Maybe<Array<Maybe<PlayerConnectionPhoto>>>
  value?: Maybe<Array<Maybe<PlayerConnectionValue>>>
  wage?: Maybe<Array<Maybe<PlayerConnectionWage>>>
  special?: Maybe<Array<Maybe<PlayerConnectionSpecial>>>
  preferred_foot?: Maybe<Array<Maybe<PlayerConnectionPreferred_Foot>>>
  body_type?: Maybe<Array<Maybe<PlayerConnectionBody_Type>>>
  real_face?: Maybe<Array<Maybe<PlayerConnectionReal_Face>>>
  joined?: Maybe<Array<Maybe<PlayerConnectionJoined>>>
  loaned_from?: Maybe<Array<Maybe<PlayerConnectionLoaned_From>>>
  contract_valid_until?: Maybe<
    Array<Maybe<PlayerConnectionContract_Valid_Until>>
  >
  height?: Maybe<Array<Maybe<PlayerConnectionHeight>>>
  weight?: Maybe<Array<Maybe<PlayerConnectionWeight>>>
  crossing?: Maybe<Array<Maybe<PlayerConnectionCrossing>>>
  finishing?: Maybe<Array<Maybe<PlayerConnectionFinishing>>>
  heading_accuracy?: Maybe<Array<Maybe<PlayerConnectionHeading_Accuracy>>>
  short_passing?: Maybe<Array<Maybe<PlayerConnectionShort_Passing>>>
  volleys?: Maybe<Array<Maybe<PlayerConnectionVolleys>>>
  dribbling?: Maybe<Array<Maybe<PlayerConnectionDribbling>>>
  curve?: Maybe<Array<Maybe<PlayerConnectionCurve>>>
  f_k_accuracy?: Maybe<Array<Maybe<PlayerConnectionF_K_Accuracy>>>
  long_passing?: Maybe<Array<Maybe<PlayerConnectionLong_Passing>>>
  ball_control?: Maybe<Array<Maybe<PlayerConnectionBall_Control>>>
  acceleration?: Maybe<Array<Maybe<PlayerConnectionAcceleration>>>
  sprint_speed?: Maybe<Array<Maybe<PlayerConnectionSprint_Speed>>>
  agility?: Maybe<Array<Maybe<PlayerConnectionAgility>>>
  reactions?: Maybe<Array<Maybe<PlayerConnectionReactions>>>
  balance?: Maybe<Array<Maybe<PlayerConnectionBalance>>>
  shot_power?: Maybe<Array<Maybe<PlayerConnectionShot_Power>>>
  jumping?: Maybe<Array<Maybe<PlayerConnectionJumping>>>
  stamina?: Maybe<Array<Maybe<PlayerConnectionStamina>>>
  strength?: Maybe<Array<Maybe<PlayerConnectionStrength>>>
  long_shots?: Maybe<Array<Maybe<PlayerConnectionLong_Shots>>>
  aggression?: Maybe<Array<Maybe<PlayerConnectionAggression>>>
  interceptions?: Maybe<Array<Maybe<PlayerConnectionInterceptions>>>
  positioning?: Maybe<Array<Maybe<PlayerConnectionPositioning>>>
  vision?: Maybe<Array<Maybe<PlayerConnectionVision>>>
  penalties?: Maybe<Array<Maybe<PlayerConnectionPenalties>>>
  composure?: Maybe<Array<Maybe<PlayerConnectionComposure>>>
  marking?: Maybe<Array<Maybe<PlayerConnectionMarking>>>
  standing_tackle?: Maybe<Array<Maybe<PlayerConnectionStanding_Tackle>>>
  sliding_tackle?: Maybe<Array<Maybe<PlayerConnectionSliding_Tackle>>>
  g_k_diving?: Maybe<Array<Maybe<PlayerConnectionG_K_Diving>>>
  g_k_handling?: Maybe<Array<Maybe<PlayerConnectionG_K_Handling>>>
  g_k_kicking?: Maybe<Array<Maybe<PlayerConnectionG_K_Kicking>>>
  g_k_positioning?: Maybe<Array<Maybe<PlayerConnectionG_K_Positioning>>>
  g_k_reflexes?: Maybe<Array<Maybe<PlayerConnectionG_K_Reflexes>>>
  best_position?: Maybe<Array<Maybe<PlayerConnectionBest_Position>>>
  nation?: Maybe<Array<Maybe<PlayerConnectionNation>>>
  team?: Maybe<Array<Maybe<PlayerConnectionTeam>>>
  international_reputation?: Maybe<
    Array<Maybe<PlayerConnectionInternational_Reputation>>
  >
  weak_foot?: Maybe<Array<Maybe<PlayerConnectionWeak_Foot>>>
  skill_moves?: Maybe<Array<Maybe<PlayerConnectionSkill_Moves>>>
  work_rate?: Maybe<Array<Maybe<PlayerConnectionWork_Rate>>>
  jersey_number?: Maybe<Array<Maybe<PlayerConnectionJersey_Number>>>
  defensive_awareness?: Maybe<Array<Maybe<PlayerConnectionDefensive_Awareness>>>
  best_overall_rating?: Maybe<Array<Maybe<PlayerConnectionBest_Overall_Rating>>>
  slug?: Maybe<Array<Maybe<PlayerConnectionSlug>>>
  published_at?: Maybe<Array<Maybe<PlayerConnectionPublished_At>>>
}

export type PlayerConnectionId = {
  __typename?: 'PlayerConnectionId'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionCreated_At = {
  __typename?: 'PlayerConnectionCreated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionUpdated_At = {
  __typename?: 'PlayerConnectionUpdated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionPlayer_Id = {
  __typename?: 'PlayerConnectionPlayer_id'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionName = {
  __typename?: 'PlayerConnectionName'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionPosition = {
  __typename?: 'PlayerConnectionPosition'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionOverall = {
  __typename?: 'PlayerConnectionOverall'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionAge = {
  __typename?: 'PlayerConnectionAge'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionHits = {
  __typename?: 'PlayerConnectionHits'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionPotential = {
  __typename?: 'PlayerConnectionPotential'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionPhoto = {
  __typename?: 'PlayerConnectionPhoto'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionValue = {
  __typename?: 'PlayerConnectionValue'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionWage = {
  __typename?: 'PlayerConnectionWage'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionSpecial = {
  __typename?: 'PlayerConnectionSpecial'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionPreferred_Foot = {
  __typename?: 'PlayerConnectionPreferred_foot'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionBody_Type = {
  __typename?: 'PlayerConnectionBody_type'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionReal_Face = {
  __typename?: 'PlayerConnectionReal_face'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionJoined = {
  __typename?: 'PlayerConnectionJoined'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionLoaned_From = {
  __typename?: 'PlayerConnectionLoaned_from'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionContract_Valid_Until = {
  __typename?: 'PlayerConnectionContract_valid_until'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionHeight = {
  __typename?: 'PlayerConnectionHeight'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionWeight = {
  __typename?: 'PlayerConnectionWeight'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionCrossing = {
  __typename?: 'PlayerConnectionCrossing'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionFinishing = {
  __typename?: 'PlayerConnectionFinishing'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionHeading_Accuracy = {
  __typename?: 'PlayerConnectionHeading_accuracy'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionShort_Passing = {
  __typename?: 'PlayerConnectionShort_passing'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionVolleys = {
  __typename?: 'PlayerConnectionVolleys'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionDribbling = {
  __typename?: 'PlayerConnectionDribbling'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionCurve = {
  __typename?: 'PlayerConnectionCurve'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionF_K_Accuracy = {
  __typename?: 'PlayerConnectionF_k_accuracy'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionLong_Passing = {
  __typename?: 'PlayerConnectionLong_passing'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionBall_Control = {
  __typename?: 'PlayerConnectionBall_control'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionAcceleration = {
  __typename?: 'PlayerConnectionAcceleration'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionSprint_Speed = {
  __typename?: 'PlayerConnectionSprint_speed'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionAgility = {
  __typename?: 'PlayerConnectionAgility'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionReactions = {
  __typename?: 'PlayerConnectionReactions'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionBalance = {
  __typename?: 'PlayerConnectionBalance'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionShot_Power = {
  __typename?: 'PlayerConnectionShot_power'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionJumping = {
  __typename?: 'PlayerConnectionJumping'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionStamina = {
  __typename?: 'PlayerConnectionStamina'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionStrength = {
  __typename?: 'PlayerConnectionStrength'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionLong_Shots = {
  __typename?: 'PlayerConnectionLong_shots'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionAggression = {
  __typename?: 'PlayerConnectionAggression'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionInterceptions = {
  __typename?: 'PlayerConnectionInterceptions'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionPositioning = {
  __typename?: 'PlayerConnectionPositioning'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionVision = {
  __typename?: 'PlayerConnectionVision'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionPenalties = {
  __typename?: 'PlayerConnectionPenalties'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionComposure = {
  __typename?: 'PlayerConnectionComposure'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionMarking = {
  __typename?: 'PlayerConnectionMarking'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionStanding_Tackle = {
  __typename?: 'PlayerConnectionStanding_tackle'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionSliding_Tackle = {
  __typename?: 'PlayerConnectionSliding_tackle'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionG_K_Diving = {
  __typename?: 'PlayerConnectionG_k_diving'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionG_K_Handling = {
  __typename?: 'PlayerConnectionG_k_handling'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionG_K_Kicking = {
  __typename?: 'PlayerConnectionG_k_kicking'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionG_K_Positioning = {
  __typename?: 'PlayerConnectionG_k_positioning'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionG_K_Reflexes = {
  __typename?: 'PlayerConnectionG_k_reflexes'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionBest_Position = {
  __typename?: 'PlayerConnectionBest_position'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionNation = {
  __typename?: 'PlayerConnectionNation'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionTeam = {
  __typename?: 'PlayerConnectionTeam'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionInternational_Reputation = {
  __typename?: 'PlayerConnectionInternational_reputation'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionWeak_Foot = {
  __typename?: 'PlayerConnectionWeak_foot'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionSkill_Moves = {
  __typename?: 'PlayerConnectionSkill_moves'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionWork_Rate = {
  __typename?: 'PlayerConnectionWork_rate'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionJersey_Number = {
  __typename?: 'PlayerConnectionJersey_number'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionDefensive_Awareness = {
  __typename?: 'PlayerConnectionDefensive_awareness'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionBest_Overall_Rating = {
  __typename?: 'PlayerConnectionBest_overall_rating'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionSlug = {
  __typename?: 'PlayerConnectionSlug'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerConnectionPublished_At = {
  __typename?: 'PlayerConnectionPublished_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<PlayerConnection>
}

export type PlayerInput = {
  player_id?: Maybe<Scalars['Long']>
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['String']>
  overall?: Maybe<Scalars['Int']>
  age?: Maybe<Scalars['Int']>
  hits?: Maybe<Scalars['Long']>
  potential?: Maybe<Scalars['Int']>
  photo?: Maybe<Scalars['ID']>
  value?: Maybe<Scalars['String']>
  wage?: Maybe<Scalars['String']>
  special?: Maybe<Scalars['Long']>
  preferred_foot?: Maybe<Scalars['String']>
  body_type?: Maybe<Scalars['String']>
  real_face?: Maybe<Scalars['String']>
  joined?: Maybe<Scalars['String']>
  loaned_from?: Maybe<Scalars['String']>
  contract_valid_until?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['String']>
  crossing?: Maybe<Scalars['Int']>
  finishing?: Maybe<Scalars['Int']>
  heading_accuracy?: Maybe<Scalars['Int']>
  short_passing?: Maybe<Scalars['Int']>
  volleys?: Maybe<Scalars['Int']>
  dribbling?: Maybe<Scalars['Int']>
  curve?: Maybe<Scalars['Int']>
  f_k_accuracy?: Maybe<Scalars['Int']>
  long_passing?: Maybe<Scalars['Int']>
  ball_control?: Maybe<Scalars['Int']>
  acceleration?: Maybe<Scalars['Int']>
  sprint_speed?: Maybe<Scalars['Int']>
  agility?: Maybe<Scalars['Int']>
  reactions?: Maybe<Scalars['Int']>
  balance?: Maybe<Scalars['Int']>
  shot_power?: Maybe<Scalars['Int']>
  jumping?: Maybe<Scalars['Int']>
  stamina?: Maybe<Scalars['Int']>
  strength?: Maybe<Scalars['Int']>
  long_shots?: Maybe<Scalars['Int']>
  aggression?: Maybe<Scalars['Int']>
  interceptions?: Maybe<Scalars['Int']>
  positioning?: Maybe<Scalars['Int']>
  vision?: Maybe<Scalars['Int']>
  penalties?: Maybe<Scalars['Int']>
  composure?: Maybe<Scalars['Int']>
  marking?: Maybe<Scalars['Int']>
  standing_tackle?: Maybe<Scalars['Int']>
  sliding_tackle?: Maybe<Scalars['Int']>
  g_k_diving?: Maybe<Scalars['Int']>
  g_k_handling?: Maybe<Scalars['Int']>
  g_k_kicking?: Maybe<Scalars['Int']>
  g_k_positioning?: Maybe<Scalars['Int']>
  g_k_reflexes?: Maybe<Scalars['Int']>
  best_position?: Maybe<Scalars['String']>
  nation?: Maybe<Scalars['ID']>
  team?: Maybe<Scalars['ID']>
  international_reputation?: Maybe<Scalars['Int']>
  weak_foot?: Maybe<Scalars['Int']>
  skill_moves?: Maybe<Scalars['Int']>
  work_rate?: Maybe<Scalars['String']>
  jersey_number?: Maybe<Scalars['Int']>
  defensive_awareness?: Maybe<Scalars['Int']>
  best_overall_rating?: Maybe<Scalars['Int']>
  slug?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditPlayerInput = {
  player_id?: Maybe<Scalars['Long']>
  name?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['String']>
  overall?: Maybe<Scalars['Int']>
  age?: Maybe<Scalars['Int']>
  hits?: Maybe<Scalars['Long']>
  potential?: Maybe<Scalars['Int']>
  photo?: Maybe<Scalars['ID']>
  value?: Maybe<Scalars['String']>
  wage?: Maybe<Scalars['String']>
  special?: Maybe<Scalars['Long']>
  preferred_foot?: Maybe<Scalars['String']>
  body_type?: Maybe<Scalars['String']>
  real_face?: Maybe<Scalars['String']>
  joined?: Maybe<Scalars['String']>
  loaned_from?: Maybe<Scalars['String']>
  contract_valid_until?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['String']>
  crossing?: Maybe<Scalars['Int']>
  finishing?: Maybe<Scalars['Int']>
  heading_accuracy?: Maybe<Scalars['Int']>
  short_passing?: Maybe<Scalars['Int']>
  volleys?: Maybe<Scalars['Int']>
  dribbling?: Maybe<Scalars['Int']>
  curve?: Maybe<Scalars['Int']>
  f_k_accuracy?: Maybe<Scalars['Int']>
  long_passing?: Maybe<Scalars['Int']>
  ball_control?: Maybe<Scalars['Int']>
  acceleration?: Maybe<Scalars['Int']>
  sprint_speed?: Maybe<Scalars['Int']>
  agility?: Maybe<Scalars['Int']>
  reactions?: Maybe<Scalars['Int']>
  balance?: Maybe<Scalars['Int']>
  shot_power?: Maybe<Scalars['Int']>
  jumping?: Maybe<Scalars['Int']>
  stamina?: Maybe<Scalars['Int']>
  strength?: Maybe<Scalars['Int']>
  long_shots?: Maybe<Scalars['Int']>
  aggression?: Maybe<Scalars['Int']>
  interceptions?: Maybe<Scalars['Int']>
  positioning?: Maybe<Scalars['Int']>
  vision?: Maybe<Scalars['Int']>
  penalties?: Maybe<Scalars['Int']>
  composure?: Maybe<Scalars['Int']>
  marking?: Maybe<Scalars['Int']>
  standing_tackle?: Maybe<Scalars['Int']>
  sliding_tackle?: Maybe<Scalars['Int']>
  g_k_diving?: Maybe<Scalars['Int']>
  g_k_handling?: Maybe<Scalars['Int']>
  g_k_kicking?: Maybe<Scalars['Int']>
  g_k_positioning?: Maybe<Scalars['Int']>
  g_k_reflexes?: Maybe<Scalars['Int']>
  best_position?: Maybe<Scalars['String']>
  nation?: Maybe<Scalars['ID']>
  team?: Maybe<Scalars['ID']>
  international_reputation?: Maybe<Scalars['Int']>
  weak_foot?: Maybe<Scalars['Int']>
  skill_moves?: Maybe<Scalars['Int']>
  work_rate?: Maybe<Scalars['String']>
  jersey_number?: Maybe<Scalars['Int']>
  defensive_awareness?: Maybe<Scalars['Int']>
  best_overall_rating?: Maybe<Scalars['Int']>
  slug?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type CreatePlayerInput = {
  data?: Maybe<PlayerInput>
}

export type CreatePlayerPayload = {
  __typename?: 'createPlayerPayload'
  player?: Maybe<Player>
}

export type UpdatePlayerInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditPlayerInput>
}

export type UpdatePlayerPayload = {
  __typename?: 'updatePlayerPayload'
  player?: Maybe<Player>
}

export type DeletePlayerInput = {
  where?: Maybe<InputId>
}

export type DeletePlayerPayload = {
  __typename?: 'deletePlayerPayload'
  player?: Maybe<Player>
}

export type Team = {
  __typename?: 'Team'
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  name?: Maybe<Scalars['String']>
  image?: Maybe<UploadFile>
  slug?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
  players?: Maybe<Array<Maybe<Player>>>
}

export type TeamPlayersArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type TeamConnection = {
  __typename?: 'TeamConnection'
  values?: Maybe<Array<Maybe<Team>>>
  groupBy?: Maybe<TeamGroupBy>
  aggregate?: Maybe<TeamAggregator>
}

export type TeamAggregator = {
  __typename?: 'TeamAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type TeamGroupBy = {
  __typename?: 'TeamGroupBy'
  id?: Maybe<Array<Maybe<TeamConnectionId>>>
  created_at?: Maybe<Array<Maybe<TeamConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<TeamConnectionUpdated_At>>>
  name?: Maybe<Array<Maybe<TeamConnectionName>>>
  image?: Maybe<Array<Maybe<TeamConnectionImage>>>
  slug?: Maybe<Array<Maybe<TeamConnectionSlug>>>
  published_at?: Maybe<Array<Maybe<TeamConnectionPublished_At>>>
}

export type TeamConnectionId = {
  __typename?: 'TeamConnectionId'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<TeamConnection>
}

export type TeamConnectionCreated_At = {
  __typename?: 'TeamConnectionCreated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<TeamConnection>
}

export type TeamConnectionUpdated_At = {
  __typename?: 'TeamConnectionUpdated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<TeamConnection>
}

export type TeamConnectionName = {
  __typename?: 'TeamConnectionName'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<TeamConnection>
}

export type TeamConnectionImage = {
  __typename?: 'TeamConnectionImage'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<TeamConnection>
}

export type TeamConnectionSlug = {
  __typename?: 'TeamConnectionSlug'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<TeamConnection>
}

export type TeamConnectionPublished_At = {
  __typename?: 'TeamConnectionPublished_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<TeamConnection>
}

export type TeamInput = {
  name?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['ID']>
  players?: Maybe<Array<Maybe<Scalars['ID']>>>
  slug?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditTeamInput = {
  name?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['ID']>
  players?: Maybe<Array<Maybe<Scalars['ID']>>>
  slug?: Maybe<Scalars['String']>
  published_at?: Maybe<Scalars['DateTime']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type CreateTeamInput = {
  data?: Maybe<TeamInput>
}

export type CreateTeamPayload = {
  __typename?: 'createTeamPayload'
  team?: Maybe<Team>
}

export type UpdateTeamInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditTeamInput>
}

export type UpdateTeamPayload = {
  __typename?: 'updateTeamPayload'
  team?: Maybe<Team>
}

export type DeleteTeamInput = {
  where?: Maybe<InputId>
}

export type DeleteTeamPayload = {
  __typename?: 'deleteTeamPayload'
  team?: Maybe<Team>
}

export type UploadFile = {
  __typename?: 'UploadFile'
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  name: Scalars['String']
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  formats?: Maybe<Scalars['JSON']>
  hash: Scalars['String']
  ext?: Maybe<Scalars['String']>
  mime: Scalars['String']
  size: Scalars['Float']
  url: Scalars['String']
  previewUrl?: Maybe<Scalars['String']>
  provider: Scalars['String']
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<Morph>>>
}

export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection'
  values?: Maybe<Array<Maybe<UploadFile>>>
  groupBy?: Maybe<UploadFileGroupBy>
  aggregate?: Maybe<UploadFileAggregator>
}

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
  sum?: Maybe<UploadFileAggregatorSum>
  avg?: Maybe<UploadFileAggregatorAvg>
  min?: Maybe<UploadFileAggregatorMin>
  max?: Maybe<UploadFileAggregatorMax>
}

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum'
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg'
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin'
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax'
  width?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
}

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy'
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>
}

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight'
  key?: Maybe<Scalars['Int']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats'
  key?: Maybe<Scalars['JSON']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize'
  key?: Maybe<Scalars['Float']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UploadFileConnection>
}

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata'
  key?: Maybe<Scalars['JSON']>
  connection?: Maybe<UploadFileConnection>
}

export type FileInput = {
  name: Scalars['String']
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  formats?: Maybe<Scalars['JSON']>
  hash: Scalars['String']
  ext?: Maybe<Scalars['String']>
  mime: Scalars['String']
  size: Scalars['Float']
  url: Scalars['String']
  previewUrl?: Maybe<Scalars['String']>
  provider: Scalars['String']
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<Scalars['ID']>>>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditFileInput = {
  name?: Maybe<Scalars['String']>
  alternativeText?: Maybe<Scalars['String']>
  caption?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  formats?: Maybe<Scalars['JSON']>
  hash?: Maybe<Scalars['String']>
  ext?: Maybe<Scalars['String']>
  mime?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  url?: Maybe<Scalars['String']>
  previewUrl?: Maybe<Scalars['String']>
  provider?: Maybe<Scalars['String']>
  provider_metadata?: Maybe<Scalars['JSON']>
  related?: Maybe<Array<Maybe<Scalars['ID']>>>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type DeleteFileInput = {
  where?: Maybe<InputId>
}

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload'
  file?: Maybe<UploadFile>
}

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission'
  id: Scalars['ID']
  type: Scalars['String']
  controller: Scalars['String']
  action: Scalars['String']
  enabled: Scalars['Boolean']
  policy?: Maybe<Scalars['String']>
  role?: Maybe<UsersPermissionsRole>
}

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole'
  id: Scalars['ID']
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>
}

export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection'
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>
  aggregate?: Maybe<UsersPermissionsRoleAggregator>
}

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy'
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>
}

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsRoleConnection>
}

export type RoleInput = {
  name: Scalars['String']
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>
  users?: Maybe<Array<Maybe<Scalars['ID']>>>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditRoleInput = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>
  users?: Maybe<Array<Maybe<Scalars['ID']>>>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type CreateRoleInput = {
  data?: Maybe<RoleInput>
}

export type CreateRolePayload = {
  __typename?: 'createRolePayload'
  role?: Maybe<UsersPermissionsRole>
}

export type UpdateRoleInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditRoleInput>
}

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload'
  role?: Maybe<UsersPermissionsRole>
}

export type DeleteRoleInput = {
  where?: Maybe<InputId>
}

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload'
  role?: Maybe<UsersPermissionsRole>
}

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser'
  id: Scalars['ID']
  created_at: Scalars['DateTime']
  updated_at: Scalars['DateTime']
  username: Scalars['String']
  email: Scalars['String']
  provider?: Maybe<Scalars['String']>
  confirmed?: Maybe<Scalars['Boolean']>
  blocked?: Maybe<Scalars['Boolean']>
  role?: Maybe<UsersPermissionsRole>
}

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection'
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>
  groupBy?: Maybe<UsersPermissionsUserGroupBy>
  aggregate?: Maybe<UsersPermissionsUserAggregator>
}

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator'
  count?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy'
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>
}

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at'
  key?: Maybe<Scalars['DateTime']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider'
  key?: Maybe<Scalars['String']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed'
  key?: Maybe<Scalars['Boolean']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked'
  key?: Maybe<Scalars['Boolean']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole'
  key?: Maybe<Scalars['ID']>
  connection?: Maybe<UsersPermissionsUserConnection>
}

export type UserInput = {
  username: Scalars['String']
  email: Scalars['String']
  provider?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  resetPasswordToken?: Maybe<Scalars['String']>
  confirmationToken?: Maybe<Scalars['String']>
  confirmed?: Maybe<Scalars['Boolean']>
  blocked?: Maybe<Scalars['Boolean']>
  role?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type EditUserInput = {
  username?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  provider?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  resetPasswordToken?: Maybe<Scalars['String']>
  confirmationToken?: Maybe<Scalars['String']>
  confirmed?: Maybe<Scalars['Boolean']>
  blocked?: Maybe<Scalars['Boolean']>
  role?: Maybe<Scalars['ID']>
  created_by?: Maybe<Scalars['ID']>
  updated_by?: Maybe<Scalars['ID']>
}

export type CreateUserInput = {
  data?: Maybe<UserInput>
}

export type CreateUserPayload = {
  __typename?: 'createUserPayload'
  user?: Maybe<UsersPermissionsUser>
}

export type UpdateUserInput = {
  where?: Maybe<InputId>
  data?: Maybe<EditUserInput>
}

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload'
  user?: Maybe<UsersPermissionsUser>
}

export type DeleteUserInput = {
  where?: Maybe<InputId>
}

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload'
  user?: Maybe<UsersPermissionsUser>
}

export type Morph =
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | UsersPermissionsLoginPayload
  | UserPermissionsPasswordPayload
  | Nation
  | NationConnection
  | NationAggregator
  | NationGroupBy
  | NationConnectionId
  | NationConnectionCreated_At
  | NationConnectionUpdated_At
  | NationConnectionName
  | NationConnectionImage
  | NationConnectionSlug
  | NationConnectionPublished_At
  | CreateNationPayload
  | UpdateNationPayload
  | DeleteNationPayload
  | Player
  | PlayerConnection
  | PlayerAggregator
  | PlayerAggregatorSum
  | PlayerAggregatorAvg
  | PlayerAggregatorMin
  | PlayerAggregatorMax
  | PlayerGroupBy
  | PlayerConnectionId
  | PlayerConnectionCreated_At
  | PlayerConnectionUpdated_At
  | PlayerConnectionPlayer_Id
  | PlayerConnectionName
  | PlayerConnectionPosition
  | PlayerConnectionOverall
  | PlayerConnectionAge
  | PlayerConnectionHits
  | PlayerConnectionPotential
  | PlayerConnectionPhoto
  | PlayerConnectionValue
  | PlayerConnectionWage
  | PlayerConnectionSpecial
  | PlayerConnectionPreferred_Foot
  | PlayerConnectionBody_Type
  | PlayerConnectionReal_Face
  | PlayerConnectionJoined
  | PlayerConnectionLoaned_From
  | PlayerConnectionContract_Valid_Until
  | PlayerConnectionHeight
  | PlayerConnectionWeight
  | PlayerConnectionCrossing
  | PlayerConnectionFinishing
  | PlayerConnectionHeading_Accuracy
  | PlayerConnectionShort_Passing
  | PlayerConnectionVolleys
  | PlayerConnectionDribbling
  | PlayerConnectionCurve
  | PlayerConnectionF_K_Accuracy
  | PlayerConnectionLong_Passing
  | PlayerConnectionBall_Control
  | PlayerConnectionAcceleration
  | PlayerConnectionSprint_Speed
  | PlayerConnectionAgility
  | PlayerConnectionReactions
  | PlayerConnectionBalance
  | PlayerConnectionShot_Power
  | PlayerConnectionJumping
  | PlayerConnectionStamina
  | PlayerConnectionStrength
  | PlayerConnectionLong_Shots
  | PlayerConnectionAggression
  | PlayerConnectionInterceptions
  | PlayerConnectionPositioning
  | PlayerConnectionVision
  | PlayerConnectionPenalties
  | PlayerConnectionComposure
  | PlayerConnectionMarking
  | PlayerConnectionStanding_Tackle
  | PlayerConnectionSliding_Tackle
  | PlayerConnectionG_K_Diving
  | PlayerConnectionG_K_Handling
  | PlayerConnectionG_K_Kicking
  | PlayerConnectionG_K_Positioning
  | PlayerConnectionG_K_Reflexes
  | PlayerConnectionBest_Position
  | PlayerConnectionNation
  | PlayerConnectionTeam
  | PlayerConnectionInternational_Reputation
  | PlayerConnectionWeak_Foot
  | PlayerConnectionSkill_Moves
  | PlayerConnectionWork_Rate
  | PlayerConnectionJersey_Number
  | PlayerConnectionDefensive_Awareness
  | PlayerConnectionBest_Overall_Rating
  | PlayerConnectionSlug
  | PlayerConnectionPublished_At
  | CreatePlayerPayload
  | UpdatePlayerPayload
  | DeletePlayerPayload
  | Team
  | TeamConnection
  | TeamAggregator
  | TeamGroupBy
  | TeamConnectionId
  | TeamConnectionCreated_At
  | TeamConnectionUpdated_At
  | TeamConnectionName
  | TeamConnectionImage
  | TeamConnectionSlug
  | TeamConnectionPublished_At
  | CreateTeamPayload
  | UpdateTeamPayload
  | DeleteTeamPayload
  | UploadFile
  | UploadFileConnection
  | UploadFileAggregator
  | UploadFileAggregatorSum
  | UploadFileAggregatorAvg
  | UploadFileAggregatorMin
  | UploadFileAggregatorMax
  | UploadFileGroupBy
  | UploadFileConnectionId
  | UploadFileConnectionCreated_At
  | UploadFileConnectionUpdated_At
  | UploadFileConnectionName
  | UploadFileConnectionAlternativeText
  | UploadFileConnectionCaption
  | UploadFileConnectionWidth
  | UploadFileConnectionHeight
  | UploadFileConnectionFormats
  | UploadFileConnectionHash
  | UploadFileConnectionExt
  | UploadFileConnectionMime
  | UploadFileConnectionSize
  | UploadFileConnectionUrl
  | UploadFileConnectionPreviewUrl
  | UploadFileConnectionProvider
  | UploadFileConnectionProvider_Metadata
  | DeleteFilePayload
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsRoleConnection
  | UsersPermissionsRoleAggregator
  | UsersPermissionsRoleGroupBy
  | UsersPermissionsRoleConnectionId
  | UsersPermissionsRoleConnectionName
  | UsersPermissionsRoleConnectionDescription
  | UsersPermissionsRoleConnectionType
  | CreateRolePayload
  | UpdateRolePayload
  | DeleteRolePayload
  | UsersPermissionsUser
  | UsersPermissionsUserConnection
  | UsersPermissionsUserAggregator
  | UsersPermissionsUserGroupBy
  | UsersPermissionsUserConnectionId
  | UsersPermissionsUserConnectionCreated_At
  | UsersPermissionsUserConnectionUpdated_At
  | UsersPermissionsUserConnectionUsername
  | UsersPermissionsUserConnectionEmail
  | UsersPermissionsUserConnectionProvider
  | UsersPermissionsUserConnectionConfirmed
  | UsersPermissionsUserConnectionBlocked
  | UsersPermissionsUserConnectionRole
  | CreateUserPayload
  | UpdateUserPayload
  | DeleteUserPayload

export type InputId = {
  id: Scalars['ID']
}

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type AdminUser = {
  __typename?: 'AdminUser'
  id: Scalars['ID']
  username?: Maybe<Scalars['String']>
  firstname: Scalars['String']
  lastname: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  nation?: Maybe<Nation>
  nations?: Maybe<Array<Maybe<Nation>>>
  nationsConnection?: Maybe<NationConnection>
  player?: Maybe<Player>
  players?: Maybe<Array<Maybe<Player>>>
  playersConnection?: Maybe<PlayerConnection>
  team?: Maybe<Team>
  teams?: Maybe<Array<Maybe<Team>>>
  teamsConnection?: Maybe<TeamConnection>
  files?: Maybe<Array<Maybe<UploadFile>>>
  filesConnection?: Maybe<UploadFileConnection>
  role?: Maybe<UsersPermissionsRole>
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>
  user?: Maybe<UsersPermissionsUser>
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>
  usersConnection?: Maybe<UsersPermissionsUserConnection>
  me?: Maybe<UsersPermissionsMe>
}

export type QueryNationArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryNationsArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
  publicationState?: Maybe<PublicationState>
}

export type QueryNationsConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryPlayerArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryPlayersArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
  publicationState?: Maybe<PublicationState>
}

export type QueryPlayersConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryTeamArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryTeamsArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
  publicationState?: Maybe<PublicationState>
}

export type QueryTeamsConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryFilesArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
  publicationState?: Maybe<PublicationState>
}

export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryRoleArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryRolesArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
  publicationState?: Maybe<PublicationState>
}

export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type QueryUserArgs = {
  id: Scalars['ID']
  publicationState?: Maybe<PublicationState>
}

export type QueryUsersArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
  publicationState?: Maybe<PublicationState>
}

export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  start?: Maybe<Scalars['Int']>
  where?: Maybe<Scalars['JSON']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createNation?: Maybe<CreateNationPayload>
  updateNation?: Maybe<UpdateNationPayload>
  deleteNation?: Maybe<DeleteNationPayload>
  createPlayer?: Maybe<CreatePlayerPayload>
  updatePlayer?: Maybe<UpdatePlayerPayload>
  deletePlayer?: Maybe<DeletePlayerPayload>
  createTeam?: Maybe<CreateTeamPayload>
  updateTeam?: Maybe<UpdateTeamPayload>
  deleteTeam?: Maybe<DeleteTeamPayload>
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>
  upload: UploadFile
  multipleUpload: Array<Maybe<UploadFile>>
  updateFileInfo: UploadFile
  login: UsersPermissionsLoginPayload
  register: UsersPermissionsLoginPayload
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>
  resetPassword?: Maybe<UsersPermissionsLoginPayload>
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>
}

export type MutationCreateNationArgs = {
  input?: Maybe<CreateNationInput>
}

export type MutationUpdateNationArgs = {
  input?: Maybe<UpdateNationInput>
}

export type MutationDeleteNationArgs = {
  input?: Maybe<DeleteNationInput>
}

export type MutationCreatePlayerArgs = {
  input?: Maybe<CreatePlayerInput>
}

export type MutationUpdatePlayerArgs = {
  input?: Maybe<UpdatePlayerInput>
}

export type MutationDeletePlayerArgs = {
  input?: Maybe<DeletePlayerInput>
}

export type MutationCreateTeamArgs = {
  input?: Maybe<CreateTeamInput>
}

export type MutationUpdateTeamArgs = {
  input?: Maybe<UpdateTeamInput>
}

export type MutationDeleteTeamArgs = {
  input?: Maybe<DeleteTeamInput>
}

export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>
}

export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>
}

export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>
}

export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>
}

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>
}

export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>
}

export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>
}

export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>
  ref?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  file: Scalars['Upload']
}

export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>
  ref?: Maybe<Scalars['String']>
  field?: Maybe<Scalars['String']>
  source?: Maybe<Scalars['String']>
  files: Array<Maybe<Scalars['Upload']>>
}

export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']
  info: FileInfoInput
}

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput
}

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']
}

export type MutationResetPasswordArgs = {
  password: Scalars['String']
  passwordConfirmation: Scalars['String']
  code: Scalars['String']
}

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type GetPlayerQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type GetPlayerQuery = { __typename?: 'Query' } & {
  players?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Player' } & Pick<
          Player,
          | 'player_id'
          | 'name'
          | 'age'
          | 'height'
          | 'weight'
          | 'preferred_foot'
          | 'defensive_awareness'
          | 'weak_foot'
          | 'international_reputation'
          | 'skill_moves'
          | 'work_rate'
          | 'real_face'
          | 'overall'
          | 'potential'
          | 'crossing'
          | 'finishing'
          | 'heading_accuracy'
          | 'short_passing'
          | 'volleys'
          | 'dribbling'
          | 'curve'
          | 'f_k_accuracy'
          | 'long_passing'
          | 'ball_control'
          | 'acceleration'
          | 'sprint_speed'
          | 'agility'
          | 'reactions'
          | 'balance'
          | 'shot_power'
          | 'jumping'
          | 'stamina'
          | 'strength'
          | 'long_shots'
          | 'aggression'
          | 'interceptions'
          | 'positioning'
          | 'vision'
          | 'penalties'
          | 'composure'
          | 'marking'
          | 'standing_tackle'
          | 'sliding_tackle'
          | 'g_k_diving'
          | 'g_k_kicking'
          | 'g_k_positioning'
          | 'g_k_reflexes'
          | 'best_position'
          | 'best_overall_rating'
          | 'position'
        > & {
            photo?: Maybe<
              { __typename?: 'UploadFile' } & Pick<UploadFile, 'url'>
            >
            nation?: Maybe<
              { __typename?: 'Nation' } & Pick<Nation, 'name'> & {
                  image?: Maybe<
                    { __typename?: 'UploadFile' } & Pick<UploadFile, 'url'>
                  >
                }
            >
            team?: Maybe<
              { __typename?: 'Team' } & Pick<Team, 'name'> & {
                  image?: Maybe<
                    { __typename?: 'UploadFile' } & Pick<UploadFile, 'url'>
                  >
                }
            >
          }
      >
    >
  >
}

export const GetPlayerDocument = gql`
  query getPlayer($id: Int!) {
    players(where: { player_id: $id }) {
      player_id
      photo {
        url
      }
      name
      age
      height
      weight
      preferred_foot
      defensive_awareness
      weak_foot
      international_reputation
      skill_moves
      work_rate
      real_face
      overall
      potential
      crossing
      finishing
      heading_accuracy
      short_passing
      volleys
      dribbling
      curve
      f_k_accuracy
      long_passing
      ball_control
      acceleration
      sprint_speed
      agility
      reactions
      balance
      shot_power
      jumping
      stamina
      strength
      long_shots
      aggression
      interceptions
      positioning
      vision
      penalties
      composure
      marking
      standing_tackle
      sliding_tackle
      g_k_diving
      g_k_kicking
      g_k_positioning
      g_k_reflexes
      best_position
      best_overall_rating
      position
      nation {
        name
        image {
          url
        }
      }
      team {
        name
        image {
          url
        }
      }
    }
  }
`

/**
 * __useGetPlayerQuery__
 *
 * To run a query within a React component, call `useGetPlayerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlayerQuery(
  baseOptions: Apollo.QueryHookOptions<GetPlayerQuery, GetPlayerQueryVariables>
) {
  return Apollo.useQuery<GetPlayerQuery, GetPlayerQueryVariables>(
    GetPlayerDocument,
    baseOptions
  )
}
export function useGetPlayerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPlayerQuery,
    GetPlayerQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetPlayerQuery, GetPlayerQueryVariables>(
    GetPlayerDocument,
    baseOptions
  )
}
export type GetPlayerQueryHookResult = ReturnType<typeof useGetPlayerQuery>
export type GetPlayerLazyQueryHookResult = ReturnType<
  typeof useGetPlayerLazyQuery
>
export type GetPlayerQueryResult = Apollo.QueryResult<
  GetPlayerQuery,
  GetPlayerQueryVariables
>
