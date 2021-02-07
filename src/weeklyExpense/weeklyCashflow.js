import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import "./weeklycashflow.css";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  // return { name, calories, fat, carbs, protein };
  //  return rows=[name, calories, fat, carbs, protein];
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTabless() {
  const classes = useStyles();
  const [incomeList, setIncomelist] = useState([]);

  useEffect(() => {
    Axios.get("https://usingmongodb.herokuapp.com/moneyManager/getmoney").then(
      (response) => {
        console.log(response.data);
        setIncomelist(response.data);
      }
    );
  }, []);

  // rows = [
  //
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  // createData("", 356, 16.0, 49, 3.9),
  // ];
  //  {
  let p = null;
  p = incomeList.map((row, i) => {
    return i + 1 <= 7 ? (
      <StyledTableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.id}</StyledTableCell>
        <StyledTableCell align="right">{row.income}</StyledTableCell>
        <StyledTableCell align="right">{row.expense}</StyledTableCell>
        <StyledTableCell align="right">{row.date}</StyledTableCell>
      </StyledTableRow>
    ) : (
      false
    );
  });
  //  }

  return (
    <div className="monthly">
      <Link to="/">
        <button className="button">BACK HOME</button>
      </Link>
      <div className="insideMonthly">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="right">id</StyledTableCell>
                <StyledTableCell align="right">income Rs</StyledTableCell>
                <StyledTableCell align="right">expense Rs</StyledTableCell>
                <StyledTableCell align="right"> YYYY-MM-DD</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {incomeList.map((row, i) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.id}</StyledTableCell>
              <StyledTableCell align="right">{row.income}</StyledTableCell>
              <StyledTableCell align="right">{row.expense}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))} */}
              {p}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
