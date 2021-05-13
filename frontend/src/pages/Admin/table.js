import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import IconButton from "@material-ui/core/IconButton";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./title";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Index = (props) => {
  const classes = useStyles();
  const { title = "Users", data = [], limitShowRows = 10 } = props;

  let fields;
  if (data === undefined || data === null) {
    fields = [];
  } else {
    console.log("data", data);
    if (data.length === 0) {
      fields = [];
    } else {
      fields = Object.keys(data[0]);
    }
  }

  const [pageNumber, setPageNumber] = useState(0);

  return (
    <React.Fragment>
      <Title>{title}</Title>
      {data.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              {fields.map((field, index) => {
                if (fields.length - 1 === index) {
                  return <TableCell align="right">Edit</TableCell>;
                } else {
                  return (
                    <TableCell>{field === "_id" ? "No" : field}</TableCell>
                  );
                }
              })}

              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, number) => (
              <TableRow key={row.id}>
                {fields.map((field, index) => {
                  if (
                    number >= pageNumber * limitShowRows &&
                    number < (pageNumber + 1) * limitShowRows
                  ) {
                    if (fields.length - 1 === index) {
                      // return (
                      //   {/*<TableCell align="right">*/}
                      //     {/*<IconButton color="secondary">*/}
                      //       {/*<EditIcon />*/}
                      //     {/*</IconButton>*/}
                      //   {/*</TableCell>*/}
                      // );
                    } else {
                      return (
                        <TableCell>
                          {field === "_id" ? number + 1 : row[field]}
                        </TableCell>
                      );
                    }
                  }
                })}
                {/*<TableCell align="right">*/}
                  {/*<IconButton color="secondary">*/}
                    {/*<DeleteIcon />*/}
                  {/*</IconButton>*/}
                {/*</TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default Index;
