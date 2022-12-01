import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";
import { useEffect, useState } from "react";

const BarChart = ({ isDashboard = false, posts, cats }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [postsData, setPostData] = useState([])
  const [catsData, setCatsData] = useState([])
  console.log(postsData)

  useEffect(() => {
    const cmpDates = (d1, d2) => {
      const date1 = new Date(d1);
      const month1 = date1.getMonth() + 1
      const day1 = date1.getDay();
      const date2 = new Date(d2);
      const month2 = date2.getMonth() + 1
      const day2 = date2.getDay();
      if (day1 === day2 && month1 === month2) return true
      else return false
    }
    const pDates = (d) => {
      const date = new Date(d);
      const month = date.getMonth() + 1
      const day = date.getDate();
      return (day + "/" + month)
    }
    const getPInDay = (d) => {
      let newP = posts
      let listP = []
      for (let i = 0; i < posts.length; i++) {
        const ps = newP.find(p => cmpDates(p.createDate, d))
        /* if (ps) {
          listP.push(ps)
          newP.splice(i, 1)
        } */
      }
      return listP
    }

    const getPInC = (cId, post) => {
      let newP = post
      let num = 0
      for (let i = 0; i < post.length; i++) {
        let ps = newP.find(p => p.categoryId = cId)
        if (ps !== undefined) {
          num = num + 1
          newP.splice(i, 1)
        }
      }
      return num
    }

    const getPostInCats = (p) => {
      let listP = []
      cats.map((c, i) => {
        const k = getPInC(c._id, p)
        if (c.name === "Du Lịch") {
          listP.push({
            DuLich: k,
            Gaming: 0,
            News: 0,
            LOL: 0
          })
        }
        else if (c.name === "Gaming") {
          listP.push({
            DuLich: 0,
            Gaming: k,
            News: 0,
            LOL: 0
          })
        }
        else if (c.name === "New") {
          listP.push({
            DuLich: 0,
            Gaming: 0,
            News: k,
            LOL: 0
          })
        }
        else if (c.name === "LOL") {
          listP.push({
            DuLich: 0,
            Gaming: 0,
            News: 0,
            LOL: k
          })
        }
      })
      return listP
    }
    const cData = () => {
      let listC = []
      cats.map((c, i) => (
        listC.push(c.name)
      ))
      setCatsData(listC)
    }
    const pData = () => {
      let listP = []
      const date = new Date()
      date.setDate(date.getDate() - 7)

      for (let i = 0; i < 7; i++) {
        const pD = pDates(date)
        const ps = getPInDay(date)
        if (ps.length !== 0) {
          const kq =getPostInCats(ps)
          console.log(kq)
          listP.push({
            country: pD,
            'Du Lịch': kq.DuLich,
            "Du LichColor": "hsl(229, 70%, 50%)",
            Gaming: kq.Gaming,
            GamingColor: "hsl(296, 70%, 50%)",
            News: kq.News,
            NewsColor: "hsl(97, 70%, 50%)",
            LOL: kq.LOL,
            LOLColor: "hsl(340, 70%, 50%)",
          })
        }
        else {
          listP.push({
            country: pD,
            'Du Lịch': 0,
            "Du LichColor": "hsl(229, 70%, 50%)",
            Gaming: 0,
            GamingColor: "hsl(296, 70%, 50%)",
            News: 0,
            NewsColor: "hsl(97, 70%, 50%)",
            LOL: 0,
            LOLColor: "hsl(340, 70%, 50%)",
          })
        }
        date.setDate(date.getDate() + 1)
      }

      setPostData(listP)
    }
    cData()
    pData()
  }, []);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={catsData}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
