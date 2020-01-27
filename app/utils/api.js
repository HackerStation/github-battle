export const fetchPopularRepos = language => {
  const endpoint = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`;
  return fetch(endpoint)
    .then(res => res.json())
    .then(jsonRes => {
      if (!jsonRes.items) {
        throw new Error(jsonRes.message);
      }
      return jsonRes.items;
    });
};
