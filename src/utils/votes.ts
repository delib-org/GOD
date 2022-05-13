import { set, get } from "lodash";

export function calcVotes(solutions: Array<any>, votes: Object) {
  const results: Object = {};
  Object.values(votes).forEach((vote) => {
    if (vote !== false) {
      const totalVotes = get(results, `${vote}`, 0);
      set(results, `${vote}`, totalVotes + 1);
    } else {
      set(results, `${vote}`, 0);
    }
  });

  const resultsObj = {};
  solutions.forEach((solution) => {
    const totalVotes = get(results, `${solution._id}`, 0);
    set(resultsObj, solution._id, totalVotes);
  });
  console.log(resultsObj);
  return false;
}
