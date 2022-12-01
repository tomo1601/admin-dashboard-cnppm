import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import Header from "../components/Header";
import { DeleteOutline } from "@mui/icons-material";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useToast } from '../contexts/Toast';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { getAllUser, blockUser, deleteUser } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const { error, success } = useToast();

  const textNumberUsers = 'Quản lý hồ sơ người dùng: ' + users.length + ' users'

  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUser();
      if (res.success) {
        let list = res.listUser
        let list2 = []
        list.map((p, i) => {
          const date = new Date(p.createDate)
          list2.push({
            id: p._id,
            fullname: p.fullname,
            email: p.email,
            username: p.username,
            createDate: date.toLocaleDateString("en-US"),
            status: p.status,
          })
        })

        setUsers(list2)
      }
    }
    getUsers()
  }, []);

  const clickStatus = async (id) => {
    const confirm = window.confirm("Are you sure you want to change state of this user?");
    if (confirm) {
      const res = await blockUser(id)
      if (res.success) {
        users.map((u, i) => {
          if (u.id === id) {
            if (u.status === 'ACTIVE')
              u.status = 'BLOCKED'
            else u.status = 'ACTIVE'
          }
        })
        success('Updated state successfully!')
      }
      else error(res.message)
    }

  }

  const clickdelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this account?");
    if (confirm) {
      const res = await deleteUser(id)
      if (res.success) {
        success('Deleted account successfully!')
      }
      else error(res.message)
    }

  }

  const columns = [
    {
      field: "id",
      headerName: "ID"
    },
    {
      field: "fullname",
      headerName: "Tên người dùng",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "createDate",
      headerName: "Ngày tạo tài khoản",
      type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Tên tài khoản",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      renderCell: ({ row: { status,id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "active"
                ? colors.greenAccent[700]
                : status === "BLOCKED"
                  ? colors.redAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
            style={{cursor:'pointer'}}
            onClick={(e)=>clickStatus(id)}
          >
            {status === "BLOCKED"}
            {status === "ACTIVE"}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status}
            </Typography>
          </Box>
        );
      },
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
            onClick={(e) => clickdelete(params.row.id)}
            />
          </>
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header title="USER" subtitle={textNumberUsers} />
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={users} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
