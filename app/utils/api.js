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

const getErrorMessage = (message, username) => {
  if (message === 'Not Found') return `${username} does not exist`;

  return message;
};

const getProfile = username => {
  const endpoint = `https://api.github.com/users/${username}`;
  return fetch(endpoint)
    .then(res => res.json())
    .then(profile => {
      if (profile.message) {
        throw new Error(getErrorMessage(profile.message, username));
      }
      return profile;
    });
};

const getRepos = username => {
  const endpoint = `https://api.github.com/users/${username}/repos?per_page=100`;
  return fetch(endpoint)
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        throw new Error(getErrorMessage(repos.message, username));
      }
      return repos;
    });
};

const getStarCount = repos => {
  return repos.reduce((acc, { stargazers_count }) => {
    return acc + stargazers_count;
  }, 0);
};

const calculateScore = (followers, repos) => {
  return followers * 3 + getStarCount(repos);
};

const getUserData = player => {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => {
      return {
        profile,
        score: calculateScore(profile.followers, repos)
      };
    }
  );
};

export const battle = players => {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    results => {
      return results.sort((a, b) => b.score - a.score);
    }
  );
};
