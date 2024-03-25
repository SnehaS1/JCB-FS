import { useEffect, useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

type ChartDataTypes = {
  bullet?: boolean;
  date: number;
  value: number;
};
function LiveSpeedDashboard() {
  useLayoutEffect(() => {
    let root = am5.Root.new("sneha");
    var value = 100;

    function generateChartData(): ChartDataTypes[] {
      var chartData = [];
      var firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 1000);
      firstDate.setHours(0, 0, 0, 0);

      for (var i = 0; i < 50; i++) {
        var newDate = new Date(firstDate);
        newDate.setSeconds(newDate.getSeconds() + i);

        value += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10;

        chartData.push({
          date: newDate.getTime(),
          value: value,
        });
      }
      return chartData;
    }

    var data = generateChartData();

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
      })
    );

    var easing = am5.ease.linear;

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        groupData: false,
        extraMax: 0.1, // this adds some space in front
        extraMin: -0.1, // this removes some space form th beginning so that the line would not be cut off
        baseInterval: {
          timeUnit: "second",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 50,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}",
        }),
      })
    );

    interface ChartData {
      date: number;
      value: number;
      bullet?: boolean;
    }

    data[data.length - 1].bullet = true;
    series.data.setAll(data);

    // Create animating bullet by adding two circles in a bullet container and
    // animating radius and opacity of one of them.
    series.bullets.push(function (root, series, dataItem) {
      // only create sprite if bullet == true in data context
      if ((dataItem as any).dataContext.bullet) {
        var container = am5.Container.new(root, {});
        var circle0 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000),
          })
        );
        var circle1 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000),
          })
        );

        circle1.animate({
          key: "radius",
          to: 20,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity,
        });
        circle1.animate({
          key: "opacity",
          to: 0,
          from: 1,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity,
        });

        return am5.Bullet.new(root, {
          locationX: undefined,
          sprite: container,
        });
      }
    });

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    // Update data every second
    setInterval(function () {
      addData();
    }, 1000);

    function addData() {
      var lastDataItem = series.dataItems[series.dataItems.length - 1];
      console.log("jjii", lastDataItem);
      debugger;
      var lastValue = lastDataItem?.get("valueY");
      var newValue = value + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 5;
      var lastDate = new Date(lastDataItem?.get("valueX") || 0);
      var time = am5.time.add(new Date(lastDate), "second", 1).getTime();
      series.data.removeIndex(0);
      series.data.push({
        date: time,
        value: newValue,
      });

      var newDataItem = series.dataItems[series.dataItems.length - 1];
      newDataItem.animate({
        key: "valueYWorking",
        to: newValue,
        from: lastValue,
        duration: 600,
        easing: easing,
      });
      console.log(lastDataItem.bullets);
      // use the bullet of last data item so that a new sprite is not created
      newDataItem.bullets = [];
      debugger;
      if (lastDataItem.bullets) {
        newDataItem.bullets[0] = lastDataItem.bullets[0];
        newDataItem.bullets[0].get("sprite").dataItem = newDataItem;
      }
      // reset bullets
      (lastDataItem.dataContext as any).bullet = false;
      lastDataItem.bullets = [];

      var animation = newDataItem.animate({
        key: "locationX",
        to: 0.5,
        from: -0.5,
        duration: 600,
      });
      if (animation) {
        var tooltip = xAxis.get("tooltip");
        if (tooltip && !tooltip.isHidden()) {
          animation.events.on("stopped", function () {
            xAxis.updateTooltip();
          });
        }
      }
    }

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    return () => root.dispose();
  }, []);

  return (
    <div
      id="sneha"
      style={{ width: "500px", height: "500px", border: "2px solid red" }}
    ></div>
  );
}
export default LiveSpeedDashboard;
