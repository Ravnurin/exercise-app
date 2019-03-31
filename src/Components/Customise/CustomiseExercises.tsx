import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'Reducers';

function CustomiseExercises() {
  return (
    <div>
      <h4>Hello World!</h4>
    </div>
  );
}

const mapStateToProps = ({ auth, exercises, errors }: ApplicationState) => ({
  auth,
  exercises,
  errors
});

export default connect(mapStateToProps, null)(CustomiseExercises);
