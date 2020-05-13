import React from "react";
import moment from "moment";
import workingDayService from '../../services/workingDayService';

const version2 = [
  {
    time: "0000"
  },
  {
    time: "0100"
  },
  {
    time: "0200"
  },
  {
    time: "0300"
  },
  {
    time: "0400"
  },
  {
    time: "0500"
  },
  {
    time: "0600"
  },
  {
    time: "0700"
  },
  {
    time: "0800"
  },
  {
    time: "0900"
  },
  {
    time: "1000"
  },
  {
    time: "1100"
  },
  {
    time: "1200"
  },
  {
    time: "1300"
  },
  {
    time: "1400"
  },
  {
    time: "1500"
  },
  {
    time: "1600"
  },
  {
    time: "1700"
  },
  {
    time: "1800"
  },
  {
    time: "1900"
  },
  {
    time: "2000"
  },
  {
    time: "2100"
  },
  {
    time: "2200"
  },
  {
    time: "2300"
  },
  {
    time: "2400"
  }
];

class Schedule extends React.Component {
  state = {
    totalHeight: 20,
    totalWidth: 0,
    xAxisStore: [],
    xAxisTicks: [],
    padding: 8,
    divider: 0,
    xAccumaltor: 0,
    nowLine: "",
    workingDays: [],

  };

  scheduleRef = React.createRef();

  generateXAxis(divider) {
    let xAxis = [];
    let xAxisTicks = [];
    let xAccumaltor = 0;
    version2.forEach((x, i) => {
      xAxis.push(this.genearteXAxisItem(x.time.slice(0, 2), xAccumaltor));
      xAxisTicks.push(this.generateAxisTicks(i, xAccumaltor));
      xAccumaltor += divider;
    });
    return { xAxis, xAxisTicks, xAccumaltor };
  }

  genearteXAxisItem(i, xAccumaltor) {
    return (
      <text
        style={{
          fontSize: "12px",
          fill: "black",
          fontFily: "Lato"
        }}
        key={i + "-text"}
        x={18}
        y={xAccumaltor + 12}
      >
        {i}
      </text>
    );
  }

  generateAxisTicks(i, xAccumaltor) {
    return (
      <line
        key={i + "_tick"}
        x1="35"
        y1={xAccumaltor + this.state.padding}
        x2="420"
        y2={xAccumaltor + this.state.padding}
        style={{ stroke: "black", strokeWidth: 1 }}
      />
    );
  }

  async componentDidMount() {
    try {
      window.addEventListener("resize", this.updateDimensions);
      this.updateDimensions();
    } catch (error) {
      console.log(error);
    }
  }

  updateDimensions = async () => {
    let svgWidth = this.scheduleRef.current.getBoundingClientRect().width;
    let divider = Math.floor(svgWidth / version2.length);
    let { xAxis, xAxisTicks, xAccumaltor } = this.generateXAxis(divider);
    const workingDays = await workingDayService.getAllWorkingDays()
    this.setState({
      xAccumaltor: xAccumaltor,
      totalWidth: svgWidth,
      xAxisStore: xAxis,
      xAxisTicks,
      divider,
      workingDays
    });
  };

  async generateTaskItems() {
    const { workingDays } = this.state;
    let leftMove = 50;
    try {
      return await workingDays.filter((day) => day.dayName === 'Monday').map((workingDay) => {
        return workingDay.shifts.map((shift, i) => {

          const timeStartTempHour = shift.timeStart.slice(0, 2);
          const timeStartTempTempMin = shift.timeStart.slice(3);

          const timeStartNoPoints = timeStartTempHour.concat('', timeStartTempTempMin);

          let normalised = ((shift.duration / 60) * this.state.divider).toFixed();

          let startMin = timeStartNoPoints.slice(timeStartNoPoints.length - 2);
          let startHour = timeStartNoPoints.slice(0, 2) + "00";

          let xStart =
            version2.findIndex(y => y.time === startHour) * this.state.divider +
            (startMin / 60) * this.state.divider +
            this.state.padding;

          if (i) {
            leftMove += 40;
          }

          return (
            <rect
              className="example"
              key={i + "_task"}
              width="25"
              height={normalised}
              x={leftMove}
              y={xStart}
              style={{
                fill: "green"
              }}
              onMouseOver={() => console.log("foo")}
            />)
        })
      })

    } catch (error) {
      console.log(error);
    }
  }

  getNowLine() {
    const testingOne = moment().minute();
    const testingTwo = moment().hour();
    let startMin = testingOne.toString();
    let startHour = testingTwo.toString() + "00";
    let xStart =
      version2.findIndex(y => y.time === startHour) * this.state.divider +
      (startMin / 60) * this.state.divider +
      this.state.padding;

    return (
      <rect
        width="250"
        height="2"
        x="0"
        y={xStart}
        style={{
          fill: "red"
        }}
      />
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    let divider = this.state.divider;
    let tasks = await this.generateTaskItems();
    let nowLine = this.getNowLine();
    if (prevState.divider !== divider) {
      this.setState({
        divider: divider,
        tasks,
        nowLine
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: "100vw",
            background: "transparent"
          }}
        >
          <svg ref={this.scheduleRef} height="100%" width="100%">
            <line
              x1="35"
              y1={this.state.padding - 1}
              x2="35"
              y2={this.state.xAccumaltor - this.state.divider + 9}
              style={{ stroke: "black", strokeWidth: 1 }}
            />
            {this.state.nowLine}
            {this.state.xAxisTicks}
            {this.state.xAxisStore}
            {this.state.tasks}
          </svg>
        </div>
      </>
    );
  }
}

export default Schedule;
