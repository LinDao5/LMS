import React from "react";

import {
  Card,
  Button,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import StarIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles((theme) => ({
  card: { margin: theme.spacing(2) },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
}));

const Index = (props) => {
  const classes = useStyles();
  const {
    level,
    title,
    subheader,
    amount,
    description,
    buttonVariant,
  } = props.data;

  const { membership, onSelect } = props;

  return (
    <Grid item key={title} xs={12} sm={title === "Enterprise" ? 12 : 6} md={6}>
      <Card className={classes.card}>
        <CardHeader
          title={title}
          subheader={subheader}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{ align: "center" }}
          action={title === "Pro" ? <StarIcon /> : null}
          className={classes.cardHeader}
        />
        <CardContent>
          <div className={classes.cardPricing}>
            <Typography component="h2" variant="h3" color="textPrimary">
              ${amount}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              /mo
            </Typography>
          </div>
          <ul>
            {description.map((line) => (
              <Typography component="li" variant="subtitle1" key={line}>
                {line}
              </Typography>
            ))}
          </ul>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            variant={buttonVariant}
            color="primary"
            disabled={membership === level}
            onClick={onSelect}
          >
            {membership === level ? "Current Membership" : "Select Membership"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Index;
