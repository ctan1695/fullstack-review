import React from 'react';

const RepoList = (props) => {
  return (
    <div>
      <div>
        <h4> Repo List Component </h4>
        There are {props.repos.length} repos.
      </div>
      <ul>
        {props.repos.map((repo) => {
          console.log('repo url: ', repo);
          return <li><a href={repo.repo_url}>{'Repo: ' + repo.repo_name}</a><br></br>{'Username: ' + repo.owner_name}<br></br>{'Number of Forks: ' + repo.repo_forks.toString()}</li>
        })}
      </ul>
    </div>
  )
}

export default RepoList;