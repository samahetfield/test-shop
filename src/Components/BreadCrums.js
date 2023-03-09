import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Route, Link as RouterLink } from 'react-router-dom';

function SimpleBreadCrum() {
  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split('/').filter((x) => x);
        return (
          <Breadcrumbs aria-label="Breadcrumb">
            <RouterLink color="inherit" to="/">
              Home
            </RouterLink>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;

              return last ? (
                <Typography color="textPrimary" key={to}>
                  {value}
                </Typography>
              ) : (
                <RouterLink color="inherit" to={to} key={to}>
                  {value}
                </RouterLink>
              );
            })}
          </Breadcrumbs>
        );
      }}
    </Route>
  );
}

export default SimpleBreadCrum;
