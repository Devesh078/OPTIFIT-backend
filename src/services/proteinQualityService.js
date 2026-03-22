const qualityDatabase =
{
  "whey": 100,
  "egg": 100,
  "chicken": 95,
  "fish": 92,
  "milk": 90,
  "soy": 85,
  "lentils": 75,
  "beans": 70,
  "nuts": 65,
  "rice": 50,
  "bread": 50
};


const getProteinQuality =
(foodName) =>
{
  const name =
  foodName.toLowerCase();

  for(const key in qualityDatabase)
  {
    if(name.includes(key))
    return qualityDatabase[key];
  }

  return 60;
};


const calculateProteinQualityScore =
(foodLogs) =>
{
  let totalProtein = 0;
  let weightedScore = 0;

  foodLogs.forEach(food =>
  {
    const protein =
    food.protein || 0;

    const quality =
    getProteinQuality(food.foodName);

    totalProtein += protein;

    weightedScore +=
    protein * quality;
  });

  if(totalProtein === 0)
  return 0;

  return Math.round(
  weightedScore / totalProtein
  );
};


module.exports =
{
calculateProteinQualityScore
};
