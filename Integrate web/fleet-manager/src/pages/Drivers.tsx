import * as React from "react";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Switch,
  DialogTitle,
  styled,
  tableCellClasses,
  TextField,
  //IconButton,
  InputAdornment,
  DialogContent,
  DialogActions,
  Dialog,
  Alert,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NewDriver, { Driver } from "../components/NewDriver";
import axios from "axios";
import { textAlign } from "@mui/system";
//import { set } from "react-hook-form";
import NavigationBar from "../components/NavigationBar";

// StyledTableCell component for custom styling of table cells
export const StyledTableCell = styled(TableCell)(
  (
    {
      /*theme*/
    }
  ) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#9A82DB",
      color: "#000000",
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign,
    },
  })
);

// CustomSwitch component for custom styling of switches
const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: `rgba(255, 0, 0, 0.1)`,
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.error.main,
  },
}));

// Drivers functional component
const Drivers: React.FC = () => {
  // State variables
  const [fName, setFName] = React.useState<string>("");
  const [lName, setLName] = React.useState<string>("");
  const [dOfBirth, setDOfBirth] = React.useState<Date>(new Date());
  const [nic, setNIC] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [contactNo, setContactNo] = React.useState<string>("");
  const [licenseNo, setLicenseNo] = React.useState<string>("");
  const [lExDate, setLExDate] = React.useState<Date>(new Date());
  const [gender, setGender] = React.useState<string>("");
  const [mediCondition, setMediCondition] = React.useState<string>("");
  const [no, setNo] = React.useState<string>("");
  const [drivers, setDrivers] = React.useState<Driver[]>([]);
  const [alldrivers, setAllDrivers] = React.useState<Driver[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    React.useState<boolean>(false);
  const [isNewDriverModalOpen, setIsNewDriverModalOpen] =
    React.useState<boolean>(false);
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [searchCategory, setSearchCategory] = React.useState<string>("no");

  // Fetch(get) all drivers when the page loads
  React.useEffect(() => {
    getAllDrivers();
  }, []);

  // Function to get all drivers
  const getAllDrivers = () => {
    setDrivers([]);
    setAllDrivers([]);
    console.log("Fetching all drivers...");

    fetch("http://localhost:3000/api/v1/driver")
      .then((res) => res.json())
      .then((data) => {
        setDrivers(data.data);
        setAllDrivers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching drivers:", error);
        setErrorMessage("Error fetching drivers");
      });
  };

  // Function to handle click event on a table row
  const handleClick = (_event: any, id: string) => {
    //const selectedIndex = selected.indexOf(id);
    const newSelected: string[] = [id];
    setSelected(newSelected);
    setErrorMessage("");
  };

  // Function to check if a row is selected
  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Function to handle delete button click
  const handleDeleteClick = () => {
    if (selected.length === 0) {
      setErrorMessage("Please select a driver to delete");
    } else {
      setIsConfirmationDialogOpen(true);
    }
  };

  // Function to handle delete confirmation
  const handleDeleteConfirmation = () => {
    setIsConfirmationDialogOpen(false);
    const d = drivers.filter((v) => v._id === selected[0])[0];
    axios
      .delete(`http://localhost:3000/api/v1/driver/${d._id}`)
      .then((r) => {
        if (r.status === 204) {
          alert("Driver deleted successfully");
          setSelected([]);
          setDrivers([]);
          getAllDrivers();
        }
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  // Function to handle update button click
  const handleUpdateClick = () => {
    if (selected.length === 0) {
      setErrorMessage("Please select a driver to update");
    } else {
      const d = drivers.filter((v) => v._id === selected[0])[0];
      if (d) {
        setIsNewDriverModalOpen(true);
        setNo(d.no || "");
        setFName(d.firstName);
        setLName(d.lastName);
        setDOfBirth(new Date(d.dob));
        setNIC(d.nic);
        setEmail(d.email);
        setContactNo(d.contactNo);
        setLicenseNo(d.licenseNo);
        setLExDate(new Date(d.licenseExpireDate));
        setGender(d.gender);
        setMediCondition(d.medicalIssues);
      }
    }
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsNewDriverModalOpen(false);
  };

  // Function to open the dialog
  const openDialog = () => {
    setIsNewDriverModalOpen(true);
  };

  // Function to clear all fields
  const clearFields = () => {
    setNo("");
    setFName("");
    setLName("");
    setContactNo("");
    setLicenseNo("");
    setLExDate(new Date());
    setDOfBirth(new Date());
    setGender("");
    setMediCondition("");
    setNIC("");
    setEmail("");
  };

  // Function to handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (alldrivers.length === 0) {
      setDrivers([]);
      setErrorMessage("No drivers in the database.");
      return;
    }

    const filteredDrivers = alldrivers.filter((driver) => {
      switch (searchCategory) {
        case "no":
          return driver?.no?.toLowerCase().includes(searchTerm);
        case "firstName":
          return driver?.firstName?.toLowerCase().includes(searchTerm);
        case "lastName":
          return driver?.lastName?.toLowerCase().includes(searchTerm);
        case "nic":
          return driver?.nic?.toLowerCase().includes(searchTerm);
        case "email":
          return driver?.email?.toLowerCase().includes(searchTerm);
        case "contactNo":
          return driver?.contactNo?.toLowerCase().includes(searchTerm);
        case "licenseNo":
          return driver?.licenseNo?.toLowerCase().includes(searchTerm);
        case "gender":
          return driver?.gender?.toLowerCase().includes(searchTerm);
        default:
          return false;
      }
    });
    setDrivers(filteredDrivers);
    if (filteredDrivers.length === 0) {
      setErrorMessage("Cannot find the driver in this category.");
    } else {
      setErrorMessage("");
    }
  };

  // Function to handle status change
  const handleStatusChange = (id: string, isActive: boolean) => {
    axios
      .put(`http://localhost:3000/api/v1/driver/${id}/status`, { isActive: !isActive })
      .then((response) => {
        console.log(
          `Driver ${isActive ? "deactivated" : "activated"}:`,
          response
        );
        getAllDrivers(); 
      })
      .catch((error) => {
        console.error(
          `Error ${isActive ? "deactivating" : "activating"} driver:`,
          error
        );
        setErrorMessage(
          `Error ${isActive ? "deactivating" : "activating"} driver`
        );
      });
  };

  const onChangeAvailability = (availability: boolean, driver: Driver) => {
    axios
      .put(`http://localhost:3000/api/v1/driver/${driver._id}`, {
        availability,
      })
      .then(() => {
        getAllDrivers();
      })
      .catch(() => {
        setErrorMessage("Error updating availability");
      });
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: "-60px", width: "91vw" }}>
      <br />
      <br />
      <NavigationBar/>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle sx={{ margin: 0, fontSize: "32px", fontWeight: "bold" }}>
          Driver Details Management
        </DialogTitle>

        <div>
          <FormControl sx={{ minWidth: 150, marginRight: "10px" }}>
            <InputLabel>Search by</InputLabel>
            <Select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              label="Search by"
            >
              <MenuItem value="no">Driver Number</MenuItem>
              <MenuItem value="firstName">First Name</MenuItem>
              <MenuItem value="lastName">Last Name</MenuItem>
              <MenuItem value="nic">NIC</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="contactNo">Contact No</MenuItem>
              <MenuItem value="licenseNo">License No</MenuItem>
              <MenuItem value="gender">Gender</MenuItem>
            </Select>
          </FormControl>

          <TextField
            placeholder="Search"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      {errorMessage && (
        <Alert severity="error" sx={{ marginTop: "10px" }}>
          {errorMessage}
        </Alert>
      )}
      <br />
      <div style={{ height: "400px", overflow: "auto" }}>
        <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">No</StyledTableCell>
                <StyledTableCell align="center">Date of Joined</StyledTableCell>
                <StyledTableCell align="center">First Name</StyledTableCell>
                <StyledTableCell align="center">Last Name</StyledTableCell>
                <StyledTableCell align="center">NIC</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">DOB</StyledTableCell>
                <StyledTableCell align="center">Contact No</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">License No</StyledTableCell>
                <StyledTableCell align="center">
                  License Exp. date
                </StyledTableCell>
                <StyledTableCell align="center">Medical Issues</StyledTableCell>
                <StyledTableCell align="center">Availability  (Short Term)</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {drivers.map((row) => {
                const isItemSelected = isSelected(row._id || "");
                return (
                  <TableRow
                    key={row._id}
                    hover
                    onClick={(event) => handleClick(event, row._id || "")}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" scope="row">
                      {row.no}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(row.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.nic}</TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right">
                      {new Date(row.dob).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">{row.contactNo}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.licenseNo}</TableCell>
                    <TableCell align="right">
                      {new Date(row.licenseExpireDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">{row.medicalIssues}</TableCell>
                    <TableCell align="right">
                      <Switch
                        checked={row.availability}
                        onChange={(e) =>
                          onChangeAvailability(e.target.checked, row)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <FormControlLabel
                        control={
                          <CustomSwitch
                            checked={row.isActive}
                            onChange={() =>
                              handleStatusChange(row._id || "", row.isActive)
                            }
                          />
                        }
                        label={row.isActive ? "Active" : "Inactive"}
                      />
                    </TableCell>
                    
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={() => setIsConfirmationDialogOpen(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <div>Are you sure you want to delete this driver?</div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsConfirmationDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirmation}
            color="primary"
            startIcon={<DeleteIcon />}
          >
            Yes, delete it
          </Button>
        </DialogActions>
      </Dialog>
      <NewDriver
        no={no}
        firstName={fName}
        lastName={lName}
        nic={nic}
        gender={gender}
        dob={dOfBirth}
        contactNo={contactNo}
        email={email}
        licenseNo={licenseNo}
        licenseExpireDate={lExDate}
        medicalIssues={mediCondition}
        getAll={getAllDrivers}
        id={selected[0]}
        isOpen={isNewDriverModalOpen}
        isUpdate={isUpdate}
        close={closeDialog}
        open={openDialog}
      />
      <br />
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => {
          setIsNewDriverModalOpen(true);
          setIsUpdate(false);
          clearFields();
        }}
      >
        Add
      </Button>
      &nbsp;&nbsp;
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={() => {
          handleUpdateClick();
          setIsUpdate(true);
        }}
      >
        Update
      </Button>
      &nbsp;&nbsp;
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteClick}
      >
        Delete
      </Button>
    </Container>

    
  );
};

export default Drivers;
