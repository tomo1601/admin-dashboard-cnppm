import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockHistory } from "../data/mockData";
import Header from "../components/Header";
import { DeleteOutline } from "@mui/icons-material";
import { useState, useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";

const Blog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { postState: { posts, cats } } = useContext(PostContext)
  const [listPosts, setsistPosts] = useState([])

  console.log(listPosts)

  useEffect(() => {
    const getPosts = () => {
      let list = posts
      let list2 = []
      list.map((p, i) => {
        const date = new Date(p.createDate)
        const catename = cats.find(e => e._id === p.categoryId)
        list2.push({
          id: p.id,
          username: p.userId.fullname,
          category: catename.name,
          title: p.title,
          createDate: date.toLocaleDateString("en-US"),
        })
      })
      setsistPosts(list2)
    }
    getPosts()
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Tiêu đề",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "Tác giả",
      flex: 1,
    },
    {
      field: "createDate",
      headerName: "Ngày tạo",
      type: "date",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Danh mục",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="blogListDelete"
            //onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header title="DANH SÁCH BÀI VIẾT" subtitle="Quản lý bài viết của người dùng" />
      <Box
        m="40px 0 0 0"
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
        <DataGrid checkboxSelection rows={listPosts} columns={columns} />
      </Box>
    </Box>
  );
};

export default Blog;
