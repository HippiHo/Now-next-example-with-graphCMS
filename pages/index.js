/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const styles = theme => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20
  },
  card: {
    backgroundColor: "#bbdefb",
    height: "100%"
  },
  title: {
    fontSize: "2rem"
  },
  description: {
    fontSize: "1rem",
    marginBottom: "1rem"
  },
  pos: {
    marginBottom: 12
  },
  contentContainer: {
    maxWidth: "1200px",
    margin: "auto"
  },
  media: {
    height: 0,
    width: "100%",
    paddingTop: "56.25%",
    backgroundSize: "contain"
  }
});

export const allPostsQuery = gql`
  query {
    projects {
      id
      title
      description
      image {
        id
        url
        handle
      }
    }
  }
`;
export const allPostsQueryVars = {
  skip: 0,
  first: 5
};

class Index extends React.Component {
  static getInitialProps() {
    const isServer = typeof window === "undefined";
    return { isServer };
  }

  state = {
    open: false
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleClick = () => {
    this.setState({
      open: true
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          example project
        </Typography>
        <Typography gutterBottom>
          <Link href="/about">
            <a>Go to the about page</a>
          </Link>
        </Typography>
        <Query query={allPostsQuery}>
          {({ loading, error, data: { projects } }) => {
            if (loading) return <div>Loading</div>;
            return (
              <Grid
                container
                justify={"space-evenly"}
                spacing={16}
                className={classes.contentContainer}
              >
                {projects.map((project, index) => (
                  <Grid item xs={4} key={index}>
                    <Card className={classes.card} key={project.id}>
                      <CardActionArea>
                        <CardContent>
                          <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                          >
                            {project.title}
                          </Typography>
                          <Typography
                            component="p"
                            className={classes.description}
                          >
                            {project.description}
                          </Typography>
                          <CardMedia
                            className={classes.media}
                            image={`https://media.graphcms.com/resize=width:200/${
                              project.image.handle
                            }`}
                            title="image"
                          />
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            );
          }}
        </Query>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleClick}
        >
          Super Secret Password
        </Button>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
