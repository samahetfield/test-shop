import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import './Breadcrums.css';

function matchRouteDefinitions(definitions, location) {
  const crumbs = [];

  definitions.forEach((definition) => {
    const match = matchPath(
      { path: definition.path, end: false },
      location.pathname,
    );
    if (match) {
      crumbs.push(definition);
    }
  });

  return crumbs;
}

function useActiveRoutePaths(routes) {
  const location = useLocation();
  const activeRoutePaths = matchRouteDefinitions(routes, location);
  return activeRoutePaths;
}

export default function Breadcrumbs({ routes }) {
  const activeRoutePaths = useActiveRoutePaths(routes);
  return (
    <div className="breadcrumb">
      {activeRoutePaths.map((active, index, { length }) => (
        <span key={active.path}>
          {index === 0 ? '' : ' > '}
          {index !== length - 1 ? (
            <Link to={active.path}>{active.title}</Link>
          ) : (
            <div>{active.title}</div>
          )}
        </span>
      ))}
    </div>
  );
}
