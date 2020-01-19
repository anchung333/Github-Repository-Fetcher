import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <table className='top25Container'>
    <thead>
      <tr className='rowtitles'>
        <th className='reporow'>Repo Name</th>
        <th>Author</th>
        <th id='fork'><span className="iconify" data-icon="fa-code-fork" data-inline="false"></span></th>
        <th>&#9733;</th>
      </tr>
    </thead>
    <tbody>
      {props.repos.map((repo, idx) =>
          <Repo repo={repo} key={idx} />
      )}
    </tbody>
  </table>
)

export default RepoList;