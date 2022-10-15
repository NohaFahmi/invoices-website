import production from './production';

const environments = () => {
  let currentEnv = production;
  return currentEnv;
};
const environmentsVariables = environments();
export default environmentsVariables;