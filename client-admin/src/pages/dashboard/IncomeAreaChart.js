import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import axios from "axios";
// third-party
import ReactApexChart from "react-apexcharts";

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ["#df0000", theme.palette.primary[700]],
      xaxis: {
        categories:
          slot === "month"
            ? [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]
            : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: slot === "month" ? 11 : 7,
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: "light",
      },
    }));
  }, [primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([
    {
      name: "Page Views",
      data: [0, 86, 28, 115, 48, 210, 136],
    },
    {
      name: "Sessions",
      data: [0, 43, 14, 56, 24, 105, 68],
    },
  ]);

  useEffect(() => {
    const weekBookData = "http://localhost:8800/api/books/getBooksThisWeek";
    const monthBookData = "http://localhost:8800/api/books/getBooksThisMonth";
    const weekCoursekData =
      "http://localhost:8800/api/courses/getCoursesThisWeek";
    const monthCourseData =
      "http://localhost:8800/api/courses/getCoursesThisMonth";

    const requests = [
      axios.get(weekBookData),
      axios.get(monthBookData),
      axios.get(weekCoursekData),
      axios.get(monthCourseData),
    ];

    // Use axios.all to send the requests concurrently
    axios
      .all(requests)
      .then(
        axios.spread(
          (weekBookData, monthBookData, weekCoursekData, monthCourseData) => {
            // Handle the responses here
            // console.log(weekBookData.data);
            // console.log(monthBookData.data);
            // console.log(weekCoursekData.data);
            // console.log(monthCourseData.data);
            setSeries([
              {
                name: "Courses",
                data:
                  slot === "month"
                    ? [...monthCourseData.data]
                    : [...weekCoursekData.data],
              },
              {
                name: "Books",
                data:
                  slot === "month"
                    ? [...monthBookData.data]
                    : [...weekBookData.data],
              },
            ]);
          }
        )
      )
      .catch((error) => {
        // Handle errors
        // console.error("Error:", error);
      });
  }, [slot]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={450}
    />
  );
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string,
};

export default IncomeAreaChart;
