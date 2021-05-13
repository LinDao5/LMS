import React from "react";
import Typography from "@material-ui/core/Typography";
import Title from "./title";

const Index = (props) => {
  const { data } = props;
  return (
    <React.Fragment>
      <Title>Recent Logins</Title>
      <Typography component="p" variant="h4">
        {data.filter((user) => user.signState === true).length}
      </Typography>

      <div style={{ flex: 1 }}></div>
      <Title>Total Registers</Title>
      <Typography component="p" variant="h4">
        {data.length}
      </Typography>
    </React.Fragment>
  );
};

export default Index;
