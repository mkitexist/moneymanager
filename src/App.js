import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import MaterialUIPickers from "./datecomponent";
import EnhancedTable from "./weeklyExpense/weeklyCashflow";
import CustomizedTabless from "./weeklyExpense/weeklyCashflow";
import Monthly from "./monthlyExpense/monthlyCashflow";
import CustomizedTables from "./monthlyExpense/monthlyCashflow";
import CustomizedTablesss from "./netCashFlow/netCashflow";
import Cardcomponent from "./cardcomponent";
import swal from "sweetalert";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useParams,
  Link,
} from "react-router-dom";

function App() {
  let movie = null;
  // console.log(datee);
  // validd();

  let [incomedate, setIncomeDate] = useState("");
  let [income, setIncome] = useState("");
  // const [expensedate, setExpenseDate] = useState("");
  let [expense, setExpense] = useState("");
  // const [review, setReview] = useState("");
  const [incomeList, setIncomelist] = useState([]);
  useEffect(() => {
    Axios.get("https://usingmongodb.herokuapp.com/moneyManager/getmoney").then(
      (response) => {
        console.log(response.data);
        setIncomelist(response.data);
      }
    );
  }, []);
  movie = incomeList.map((val) => {
    console.log(val.date, +val.income, +val.expense);
    // if (incomeList.length <= 7) {
    return (
      <div>
        <table>
          <tr>
            <td>{val.id}</td>
            <td>{val.income}</td>
            <td>{val.expense}</td>
            <td>{val.date}</td>
          </tr>
        </table>

        {/* id:{val.id}, date:{val.date}, income:= {val.income},expense:
        {val.expense} */}
      </div>
    );
    // }
  });
  const submitReview = () => {
    Axios.post("https://usingmongodb.herokuapp.com/moneyManager/postmoney", {
      date: incomedate,
      income: income,
      expense: expense,
    }).then(() => {
      swal("Good job!", "You added!", "success");
      // alert("sucess");
    });
    setTimeout(() => {
      window.location.reload();
    }, 700);
  };
  let p =
    expense.length && income.length && incomedate.length > 1 ? false : true;

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="head">
            {/* <h1>hi im in head</h1> */}
            <h1>MONEY MANAGEMENT MADE EASY</h1>
          </div>
          <div className="App container">
            <div className="form">
              <label className="label">yyyy-mm-dd</label>
              <input
                type="text"
                name="name"
                placeholder="YYYY-MM-DD"
                // onFocus="do enter something"
                onChange={(e) => {
                  // console.log(e);

                  setIncomeDate(e.target.value);
                }}
              ></input>
              {/* <MaterialUIPickers change={handleDateChange} /> */}

              <label className="label">income</label>

              <input
                type="text"
                name="name"
                placeholder="INCOME"
                onChange={(e) => {
                  setIncome(e.target.value);
                }}
              ></input>
              <label className="label">expense</label>

              <input
                type="text"
                name="name"
                placeholder="EXPENSE"
                onChange={(e) => {
                  setExpense(e.target.value);
                }}
              ></input>
            </div>
            <div className="butoncontainer">
              <button className="sub" disabled={p} onClick={submitReview}>
                submit
              </button>
            </div>
            <Cardcomponent></Cardcomponent>
            <div className="viewtabcontainer">
              <div>
                <Link to="/weekly/7">
                  <button className="view">WEEKLY CASH</button>
                </Link>
                <Link to="/netcash">
                  <button className="view">NET CASH</button>
                </Link>
                <Link to="/monthly/30">
                  <button className="view">MONTHLY CASH</button>
                </Link>
              </div>
            </div>

            {/* {movie} */}
          </div>
        </Route>
        <Route path="/monthly/:id" exact>
          <CustomizedTables />
        </Route>
        <Route path="/weekly/:id" exact>
          {/* {movie} */}
          {/* <Weeklyflow></Weeklyflow> */}
          <CustomizedTabless />
          {/* <EnhancedTable></EnhancedTable> */}
        </Route>
        <Route path="/netcash" exact>
          <CustomizedTablesss />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
