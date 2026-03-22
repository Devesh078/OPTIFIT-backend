const getCaloriesPerMinute = (type, intensity) => {

  const table = {
    strength: {
      low: 5,
      moderate: 7,
      high: 9
    },
    cardio: {
      low: 6,
      moderate: 9,
      high: 12
    }
  };

  return table[type][intensity];

};

const calculateCaloriesBurned = (type, intensity, duration) => {

  const perMinute = getCaloriesPerMinute(type, intensity);

  return Math.round(perMinute * duration);

};

module.exports = { calculateCaloriesBurned };
