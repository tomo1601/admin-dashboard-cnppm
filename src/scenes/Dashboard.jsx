import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../components/Header";
import BarChart from "../components/BarChart";
import StatBox from "../components/StatBox";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PostContext } from "../contexts/PostContext";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { authState: { isAuthenticated }, getAllUser } = useContext(AuthContext)
  const { postState: { posts, cats } } = useContext(PostContext)
  const [newUsers, setNewUsers] = useState([])
  const [allUser, setAllUser] = useState([])
  const [newPosts, setNewPosts] = useState([])

  const rateUp = (newUsers.length/allUser.length).toFixed(2)
  const textUp = '+' + rateUp*100 +'%'

  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUser();
      if (res.success) {
        setAllUser(res.listUser)
        const listUsers = res.listUser
        let listNewUsers =[]
        listUsers.map((u,i) => {
          const crtDate = new Date(u.createDate).getTime()
          const currentDate = new Date().getTime()
          if((currentDate-crtDate)/1000 < 604800){
            listNewUsers.push(u)
          }
        })
        setNewUsers(listNewUsers)
      }
    }
    const getPosts = async () => {
        let listNewPosts =[]
        posts.map((u,i) => {
          const crtDate = new Date(u.createDate).getTime()
          const currentDate = new Date().getTime()
          if((currentDate-crtDate)/1000 < 2592000){
            listNewPosts.push(u)
          }
        })
        setNewPosts(listNewPosts)
      }

    getUsers()
    getPosts()
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Chào mừng đến với bảng điều khiển" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            disabled={!isAuthenticated}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Tải xuống báo cáo
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Email đã gửi"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
        {/* new user*/}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newUsers.length}
            subtitle="Người dùng mới trong 7 ngày"
            progress={rateUp}
            increase={textUp}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Số lượng bài viết mới trong 7 ngày gần nhất
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {newPosts.length}
              </Typography>
            </Box>
            {/* <Box>
              <IconButton disabled={!isAuthenticated}>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <BarChart isDashboard={true} posts={newPosts} cats={cats}/>
          </Box>
        </Box>
        {/* bar chart*/}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Bài viết mới tạo
            </Typography>
          </Box>
          {posts.map((p, i) => {
            const date = new Date(p.createDate)
            const catename = cats.find(e => e._id === p.categoryId)
            return (
              <Box
                key={`${p.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                  >
                    {p.userId.fullname}
                  </Typography>
                </Box>
                <Box>
                  <Typography color={colors.grey[100]}>
                    {p.title}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{date.toLocaleDateString("en-US")}</Box>
                <Box color={colors.blueAccent[500]}>{catename.name}</Box>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
