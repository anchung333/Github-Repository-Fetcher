import React from 'react';

const Repo = (props) => (
  <tr>
    <td className='reponame'><a href={props.repo.html_url}>{props.repo.name}</a></td>
    <td className='repoauthor'><a href={props.repo.owner.html_url}>{props.repo.owner.login}</a></td>
    <td className='forks'>{props.repo.forks_count}</td>
    <td className='stars'>{props.repo.stargazers_count}</td>

  </tr>
)

export default Repo;