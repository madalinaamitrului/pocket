import React from "react";
import Chart from "react-google-charts";
function PieChart(props) {
    let expenses=props.costs;
    
  return (
    <Chart
      width={"400px"}
      height={"400px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Expenses", "Money spended"],
        ["Restaurant",expenses.restaurant],
        ["Shopping", expenses.shopping],
        ["Transport",expenses.transport],
        ["Divertisment", expenses.divertisment],
        ["Health", expenses.health],
        ["Bills", expenses.bills],
        ["Other", expenses.other]
      ]}
      options={{
        title: "Expenses",
        is3D: true,
        slices: [
          {
            color: "#324761",
          },
          {
            color: "#93C2FA",
          },
          {
            color: "#75A5E0",
          },
          {
            color: "#4F5761",
          },
          {
            color: "#5A80AD",
          },
          {
            color: "#106160",
          },
          {
            color: "#1CADAB",
          },
        ],
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
}
export default PieChart;
