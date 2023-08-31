import "./Userlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../../dummyData";
import { DeleteOutline } from "@mui/icons-material";
import Topbar from "../components/topbar/Topbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const Userlist = ({user}) => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "Username",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 90,
    },
    {
      field: "dealsmade",
      headerName: "Deals Made",
      width: 90,
    },
    {
      field: "products",
      headerName: "Products",
      width: 90,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Topbar/>
      <div className="container">
      <Sidebar/>
    <div className="userlist">
      <DataGrid
        rows={userRows}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        />
    </div>
        </div>
        </div>
  );
};

export default Userlist;
