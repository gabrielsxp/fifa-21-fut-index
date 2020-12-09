import { comparePlayers } from 'utils/playerMethods'
import { useSelector, useDispatch } from 'react-redux'
import { InitialStateProps } from 'redux-local/players'

const players = [
  {
    player_id: 176580,
    photo: {
      url:
        'https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133341/l_suarez_176580_4ded290c13.png'
    },
    name: 'L. Suárez',
    jersey_number: 9,
    age: 33,
    height: "6'0",
    weight: '190lbs',
    preferred_foot: 'Right',
    defensive_awareness: 57,
    weak_foot: 4,
    international_reputation: 5,
    skill_moves: 3,
    work_rate: 'High/ Medium',
    real_face: 'Yes',
    overall: 87,
    potential: 87,
    crossing: 80,
    finishing: 92,
    heading_accuracy: 84,
    short_passing: 83,
    volleys: 90,
    dribbling: 84,
    curve: 86,
    f_k_accuracy: 82,
    long_passing: 77,
    ball_control: 84,
    acceleration: 72,
    sprint_speed: 68,
    agility: 76,
    reactions: 92,
    balance: 78,
    shot_power: 89,
    jumping: 69,
    stamina: 78,
    strength: 85,
    long_shots: 88,
    aggression: 87,
    interceptions: 41,
    positioning: 91,
    vision: 84,
    penalties: 83,
    composure: 85,
    marking: 0,
    standing_tackle: 45,
    sliding_tackle: 38,
    g_k_diving: 27,
    g_k_kicking: 31,
    g_k_handling: 25,
    g_k_positioning: 33,
    g_k_reflexes: 37,
    best_position: 'ST',
    best_overall_rating: 87,
    position: 'RS',
    nation: {
      name: 'Uruguay',
      image: {
        url:
          'https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133340/uruguay_9f998a191f.png'
      }
    },
    team: {
      name: 'Atlético Madrid',
      image: {
        url:
          'https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133338/atletico_madrid_59d75d710c.png'
      }
    }
  },
  {
    player_id: 212198,
    photo: {
      url:
        'https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133349/bruno_fernandes_212198_369f31db5e.png'
    },
    name: 'Bruno Fernandes',
    jersey_number: 18,
    age: 25,
    height: "5'10",
    weight: '152lbs',
    preferred_foot: 'Right',
    defensive_awareness: 72,
    weak_foot: 4,
    international_reputation: 2,
    skill_moves: 4,
    work_rate: 'High/ High',
    real_face: 'Yes',
    overall: 87,
    potential: 90,
    crossing: 87,
    finishing: 77,
    heading_accuracy: 58,
    short_passing: 88,
    volleys: 86,
    dribbling: 85,
    curve: 86,
    f_k_accuracy: 87,
    long_passing: 87,
    ball_control: 88,
    acceleration: 78,
    sprint_speed: 76,
    agility: 79,
    reactions: 86,
    balance: 79,
    shot_power: 89,
    jumping: 72,
    stamina: 94,
    strength: 67,
    long_shots: 89,
    aggression: 70,
    interceptions: 74,
    positioning: 83,
    vision: 90,
    penalties: 91,
    composure: 86,
    marking: 0,
    standing_tackle: 67,
    sliding_tackle: 55,
    g_k_diving: 12,
    g_k_kicking: 15,
    g_k_handling: 14,
    g_k_positioning: 8,
    g_k_reflexes: 14,
    best_position: 'CAM',
    best_overall_rating: 88,
    position: 'CAM',
    nation: {
      name: 'Portugal',
      image: {
        url:
          'https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133347/portugal_c401403d04.png'
      }
    },
    team: {
      name: 'Manchester United',
      image: {
        url:
          'https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133346/manchester_united_28da21f34e.png'
      }
    }
  },
  {
    player_id: 194765,
    photo: {
      url:
        'https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133352/a_griezmann_194765_1548ec3266.png'
    },
    name: 'A. Griezmann',
    jersey_number: 7,
    age: 29,
    height: "5'9",
    weight: '161lbs',
    preferred_foot: 'Left',
    defensive_awareness: 59,
    weak_foot: 3,
    international_reputation: 4,
    skill_moves: 4,
    work_rate: 'Medium/ Medium',
    real_face: 'Yes',
    overall: 87,
    potential: 87,
    crossing: 83,
    finishing: 88,
    heading_accuracy: 83,
    short_passing: 84,
    volleys: 87,
    dribbling: 87,
    curve: 86,
    f_k_accuracy: 85,
    long_passing: 82,
    ball_control: 89,
    acceleration: 80,
    sprint_speed: 79,
    agility: 91,
    reactions: 92,
    balance: 83,
    shot_power: 81,
    jumping: 90,
    stamina: 86,
    strength: 63,
    long_shots: 82,
    aggression: 73,
    interceptions: 49,
    positioning: 89,
    vision: 85,
    penalties: 86,
    composure: 89,
    marking: 0,
    standing_tackle: 54,
    sliding_tackle: 49,
    g_k_diving: 14,
    g_k_kicking: 14,
    g_k_handling: 8,
    g_k_positioning: 13,
    g_k_reflexes: 14,
    best_position: 'ST',
    best_overall_rating: 87,
    position: 'RW',
    nation: {
      name: 'France',
      image: {
        url:
          'https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133351/france_d11b10f904.png'
      }
    },
    team: {
      name: 'FC Barcelona',
      image: {
        url:
          'https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133350/fc_barcelona_6f885e5965.png'
      }
    }
  }
]
const Home = () => {
  const dispatch = useDispatch()

  dispatch({
    type: 'SET_PLAYERS',
    payload: { players }
  })
  const p = useSelector((state: InitialStateProps) => state.players)
  comparePlayers(p)
  return (
    <div>
      <h1>HOme</h1>
    </div>
  )
}

export default Home
