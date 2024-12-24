export const createLineChartOption = (theme: string) => {
  return {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,
      },
      background: "transparent"
    },
    theme: {
      mode: theme,
    },

    tooltip: {
      theme: theme,
      format: "dd-MMMM-yy"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",

    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "14px",
          fontWeight: "400",
          fontFamily: "Oswald, san-serif",
        }
      },
      axisBorder: {
        show: true
      },
      type: 'datetime'
    },
    yaxis: {
      show: true
    },
    legend: {
      show: false
    },
    grid: {
      show: false,
      column: {
        colors: ["transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    fill: {
      colors: ["#6AD2FF"]
    }
  }
}

export const createPieChartOption = (categories: string[], colors: string[]) => {
  return {
    chart: {
      width: '75px',
    },
    labels: categories,
    colors: colors,
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    hover: {mode: null},
    plotOptions: {
      donut: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
    },
  }
}

export const createLineChartData = (categories: number[], data: number[]) => {
  return categories.map((category) => {
    return [category, Math.round(Math.random() * 100)];
  })
}

export const getPieChartColor = (theme ?: string) => {
  if (!theme || theme === 'light') return ["#50bffd", "#ffe856", "#34f42b", "#f81f1f", "#f53ddf", "#331cff"];
  else return ["#0C134F", "#5C469C", "#562B08", "#420516", "#346751", "#246b89"]
}

