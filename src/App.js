import React, { useState, useEffect } from "react";
import "./styles/App.css";
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  InputBase,
  Link,
} from "@material-ui/core";
import axios from "axios";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    borderRadius: 15,
  },
  Avatar: {
    borderRadius: 0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    marginTop: 10,
    marginBottom: 18,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/photos");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="See your financial report"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableBody>
            {users
              .filter((user) => {
                if (search === "") {
                  return user;
                } else if (
                  user.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return user;
                }
              })
              .map((user) => (
                <TableRow>
                  <TableCell>
                    <Avatar
                      className={classes.Avatar}
                      alt={user.thumbnailUrl}
                      src={user.thumbnailUrl}
                    />
                  </TableCell>
                  <TableCell>
                    {user.title}
                    <br />
                    <Link href={user.url}>{user.url}</Link>
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
