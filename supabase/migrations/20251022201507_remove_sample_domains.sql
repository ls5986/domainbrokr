-- Remove fake sample domains that were created during initial setup
DELETE FROM domains WHERE name IN (
  'techflow',
  'marketpulse', 
  'cloudnest',
  'datadrop',
  'growthlab',
  'paystream',
  'healthhub',
  'learnwise',
  'shopverse',
  'foodcraft'
);

