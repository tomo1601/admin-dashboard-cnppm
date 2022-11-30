import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockCategory } from "../data/mockData";
import Header from "../components/Header";
import { DeleteOutline } from "@mui/icons-material";
import { PostContext } from "../contexts/PostContext";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from '../contexts/Toast';
import Form from 'react-bootstrap/Form'
import AddBoxIcon from '@mui/icons-material/AddBox';

const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { postState: { cats } } = useContext(PostContext)
  const { deleteCate, newCate } = useContext(AuthContext)
  const [listCats, setListCats] = useState([])
  const { error, success } = useToast();
  const [newCat, setNewCat] = useState({
    name: "",
    description: ""
  })

  const { name, description } = newCat

  const onChangNewCat = event =>
    setNewCat({ ...newCat, [event.target.name]: event.target.value })

  const onClickAddCat = async (event) => {
    event.preventDefault()
    try {
      const loginData = await newCate(newCat)
      if (!loginData.success) {
        error('Created Fail!')
      }
      else success('Created Successfully!')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getPosts = () => {
      let list = cats
      let list2 = []
      list.map((p, i) => {
        const date = new Date(p.createDate)
        list2.push({
          id: p._id,
          name: p.name,
          description: p.description,
          createDate: date.toLocaleDateString("en-US"),
        })
      })
      setListCats(list2)
    }
    getPosts()
  }, []);

  const clickdelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this account?");
    if (confirm) {
      const res = await deleteCate(id)
      if (res.success) {
        success('Deleted category successfully!')
      }
      else error(res.message)
    }

  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Tên danh mục",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Mô tả",
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
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="catListDelete"
              onClick={() => clickdelete(params.row.id)}
            />
          </>
        );
      },
    }
  ];

  return (
    <Box m="20px">
      <Header title="DANH SÁCH DANH MỤC" subtitle="Quản lý DANH mục" />
      <div>
        <Form>
          <Form.Group style={{ display: 'inline-block' }}>
            <Form.Control
              style={{ margin: '5px', width: '90%' }}
              type='text'
              placeholder='Category name'
              name='name'
              required
              value={name}
              onChange={onChangNewCat}
            />
          </Form.Group>
          <Form.Group style={{ display: 'inline-block' }}>
            <Form.Control
              style={{ margin: '5px', width: '90%' }}
              type='text'
              placeholder='Mô tả'
              name='description'
              required
              value={description}
              onChange={onChangNewCat}
            />
          </Form.Group>
          <IconButton onClick={onClickAddCat} >
            <AddBoxIcon style={{height:'40px', width:'40px'}}/>
          </IconButton>
        </Form>
      </div>
      <Box
        m="10px 0 0 0"
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
        <DataGrid checkboxSelection rows={listCats} columns={columns} />
      </Box>
    </Box>
  );
};

export default Category;
