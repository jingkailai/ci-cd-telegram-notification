import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../utils/spinners'
function PrivateRoute({ path, Auth: { isAuthenticated, loading }, component }) {
  const Component = component;
  return (
    <Route
      path={path}
      render={(properties) => {
        if (!isAuthenticated && loading) return <Spinner />;
        if (!isAuthenticated && !loading) return <Redirect to="/login" />;
        return <Component {...properties} />;
      }}
    />
  );
}
const mapStateToProps = ({ Auth }) => ({ Auth })
export default connect(mapStateToProps)(PrivateRoute);